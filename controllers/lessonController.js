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

export const handleUpdateLesson = async function(req,res){
  const {name,hours,lesson_type,number_of_people,days} = req.body.data;
  const {id} = req.body;
  if(!name || !lesson_type || !hours || !number_of_people || !days){
    return res.status(424).json({message:"Error! Values missing."});
  }
  try {
    await Lesson.update({
      name,
      hours,
      number_of_people,
      lesson_type,
      days
    },{
      where: {
        id
      }
    });
    const lessons = await Lesson.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    return res.status(200).json({lessons,message:"Updated! Lesson updated successfully."});
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

export const handleGetLesson = async function(req,res){
  const {id} = req.params;
  try{
    const lesson = await Lesson.findOne({
      where: {
        id
      }
    })
    return res.status(200).json({lesson});
  }catch(error){
    return res.status(424).json({message:"Error!"+error});
  }
}

export const handleRemoveLesson = async function(req,res){
  const {id} = req.params;
  try{
    await Lesson.destroy({where: {id: id}});
    const lessons = await Lesson.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    })
    return res.status(200).json({lessons,message:"Removed! Lesson removed successfully."});
  }catch(error) {
    return res.status(424).json({message:"Error! "+error});
  }
}