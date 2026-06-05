import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        //min-length validation
    },
    videoUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },

    transcript: {
        text: String,
        fetchedAt: Date
    }

}, { timestamps: true })

const Lecture = mongoose.model('Lecture', lectureSchema);
export default Lecture;