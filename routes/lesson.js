import express from 'express';
const router = express();
import {handleAddLesson, handleGetAll} from '../controllers/lessonController.js';

// Lessons
router.get('/all',handleGetAll).post('/add',handleAddLesson);

export default router;