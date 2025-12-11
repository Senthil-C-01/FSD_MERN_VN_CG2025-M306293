const Book = require('../models/book');
const mongoose = require('mongoose');
const isValidObjectId = (id)=> mongoose.Types.ObjectId.isValid(id);

exports.createBook = async(req,res,next)=>{
  try{
    const {title,author,publishedYear,genre}=req.body;
    if(!title||!author||publishedYear===undefined||!genre){
      return res.status(400).json({success:false,error:'All fields required'});
    }
    const saved = await new Book({title,author,publishedYear,genre}).save();
    return res.status(201).json({success:true,data:saved});
  }catch(err){ next(err); }
};

exports.getAllBooks = async(req,res,next)=>{
  try{
    const {genre}=req.query; const filter={};
    if(genre) filter.genre=new RegExp('^'+genre+'$','i');
    const books=await Book.find(filter).sort({publishedYear:1});
    res.json({success:true,data:books});
  }catch(err){ next(err); }
};

exports.getBookById = async(req,res,next)=>{
  try{
    const {id}=req.params;
    if(!isValidObjectId(id)) return res.status(400).json({success:false,error:'Invalid id'});
    const book=await Book.findById(id);
    if(!book) return res.status(404).json({success:false,error:'Not found'});
    res.json({success:true,data:book});
  }catch(err){ next(err); }
};

exports.updateBookById = async(req,res,next)=>{
  try{
    const {id}=req.params;
    if(!isValidObjectId(id)) return res.status(400).json({success:false,error:'Invalid id'});
    const updated=await Book.findByIdAndUpdate(id, req.body,{new:true,runValidators:true});
    if(!updated) return res.status(404).json({success:false,error:'Not found'});
    res.json({success:true,data:updated});
  }catch(err){ next(err); }
};

exports.deleteBookById = async(req,res,next)=>{
  try{
    const {id}=req.params;
    if(!isValidObjectId(id)) return res.status(400).json({success:false,error:'Invalid id'});
    const del=await Book.findByIdAndDelete(id);
    if(!del) return res.status(404).json({success:false,error:'Not found'});
    res.json({success:true,data:del});
  }catch(err){ next(err); }
};
