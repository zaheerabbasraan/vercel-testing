import express from 'express';
import {ROLES_LIST} from '../config/roles_list.js';
import { verifyRoles } from '../middleware/verifyRoles.js';

const router = express.Router();

router.route('/').
  get(function(req,res){
    res.json({"message":"Getting resources"});
  }).post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),function(req,res){
    res.json({"message":"Storing rource"});
  }).put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),function(req,res){
    res.json({"message":"Patching resource"});
  }).delete(verifyRoles(ROLES_LIST.Admin),function(req,res){
    res.json({"message":"Deleting resource"});
  });

  export default router;