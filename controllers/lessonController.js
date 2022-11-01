import db from '../models/index.js';

const Lesson = db.Lesson;

export const handleAddLesson = async function(req,res){
  const {name,hours,lesson_type,number_of_people,days} = req.body.data;
  if(!name || !lesson_type || !hours || !number_of_people || !days){
    return res.status(424).json({message:"Error! Values missing."});
  }

  try {
    await Lesson.create({
      name,
      hours,
      number_of_people,
      lesson_type,
      days
    });
    const lessons = await Lesson.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessons,message:"Added! Lesson added successfully."});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}

export const handleGetAll = async function(req,res){
  try {
    const lessons = await Lesson.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessons});
  } catch (error) {
    return res.status(424).json({message:"Error! "+error});
  }
}