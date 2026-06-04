import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    completedLectures:[{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    progress:{
        type:Number,
        default:0
    }

}, { timestamps: true })

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;