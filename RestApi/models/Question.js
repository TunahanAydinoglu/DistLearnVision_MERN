const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const QuestionSchema = new Schema({
    title : {
        type : String,
        required:[true,"Please provide a title"],
        minlength : [10,"Please provide title at least 10 characters"],
        unique : true
    },
    content : {
        type : String,
        required : [true,"Please provide a content"],
        minlength : [20,"Please provide content at least 20 characters"]
    },
    slug : String,
    createdAt : {
        type : Date,
        default : Date.now
    },
    likeCount : {
        type : Number,
        default : 0,
        min: 0
    },
    likes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        }
    ],
    dislikeCount : {
        type : Number,
        default : 0,
        min: 0
    },
    dislikes : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        }
    ],
    
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    answerCount  : {
        type:Number,
        default : 0
    },
    lesson : {
        type : mongoose.Schema.ObjectId,
        ref : "Lesson",
        required : true
    },
    answers: [
        {
            type: mongoose.Schema.ObjectId, 
            ref: 'Answer' 
        }
    ]

});

// Pre Save Method
QuestionSchema.pre("save",function(next){
    if (!this.isModified("title")) next();
    
    this.slug = this.makeSlug();
    next();

});

QuestionSchema.virtual("likesCount").get(function() {

    return this.likes.length;
});
QuestionSchema.virtual("DislikesCount").get(function() {

    return this.dislikes.length;
});

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title,{
        replacement: '-',   
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
};
module.exports  = mongoose.model("Question",QuestionSchema);


