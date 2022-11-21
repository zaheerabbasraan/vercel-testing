import express from 'express';
const router = express();
import {handleAddLesson, handleGetAll, handleGetLesson, handleRemoveLesson, handleUpdateLesson} from '../controllers/lessonController.js';

// Lessons
router.get('/all',handleGetAll).post('/add',handleAddLesson).delete('/:id',handleRemoveLesson).get('/:id',handleGetLesson).post('/update',handleUpdateLesson);

export default router;