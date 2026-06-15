const Note =
require("../models/Note");

exports.createNote =
async(req,res)=>{

 try{

  const note =
  await Note.create(
   req.body
  );

  res.status(201).json(note);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.getNotes =
async(req,res)=>{

 const notes =
 await Note.find()
 .sort({
  createdAt:-1
 });

 res.json(notes);

};