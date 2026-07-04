import mongoose from 'mongoose';

const technicalQuestionSchema = mongoose.Schema({
    question : {
        type : String,
        required:[true,"Question is required."]
    },
    intention : {
        type : String,
        required:[true,"Intention is required."]
    },
    answer : {
        type : String,
        required:[true,"Answer is required."]
    },
},{
    _id : false
});

const behavioralQuestionSchema = mongoose.Schema({
    question : {
        type : String,
        required:[true,"Question is required."]
    },
    intention : {
        type : String,
        required:[true,"Intention is required."]
    },
    answer : {
        type : String,
        required:[true,"Answer is required."]
    },
},{
    _id : false
});

const skillGapSchema = mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required."]
    },
    severity : {
        type : String,
        enum : [ "Low", "Medium", "High"],
        required : [true , "Severity is required"]
    }
},{
    _id : false
});

const preparationPlanSchema = mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required."]
    }, 
    focus :{
        type : String,
        required : [true, "Focus is required."]
    },
    tasks : [{
        type : String,
         required : [true, "Task is required."]
    }]
},{
    _id: false
});

const interviewReportSchema = mongoose.Schema({
    jobDescription:{
        type : String,
        required : [true, "Job description is required."]
    },
    selfDescription : {
        type : String,
    },
    resume : {
        type : String
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100,
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }

},{
    timestamps : true
});

const interviewReportModel = mongoose.model('interviewReport', interviewReportSchema);

export default interviewReportModel;