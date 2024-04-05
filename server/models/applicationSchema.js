import mongoose from "mongoose"
import validator from "validator"

const applicationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a Name"],
        minLength:[3,"Name must have atleast 3 characters"],
        maxLength:[30,"Name must be less than 30 characters"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please give a valid Email"],
        required:[true,"Please provide a Email"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide Cover Letter"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your Phone number"]
    },
    address:{
        type:String,
        required:[true,"Please provide your Address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true,
        }
    },
    for:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Student"],
            required:true,
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Company"],
            required:true,
        }      
    }
})

export const Application = mongoose.model("Application",applicationSchema)