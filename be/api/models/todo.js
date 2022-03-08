const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type :String, required:true},
    category:{type :mongoose.Schema.Types.ObjectId,ref: "Category", required:true},
    priority:{type :String, required:true},
    isActive: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }
});
module.exports=mongoose.model('TODO',todoSchema);