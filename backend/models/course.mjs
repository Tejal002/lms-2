import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        //min-length validation
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }
    ],
    thumbnail: {
        url: String,
        fileName: String
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    rating: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number
        }
    }]

},
    {
        timestamps: true
    })

const Course = mongoose.model('Course', courseSchema);
export default Course;