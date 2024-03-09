import { Schema, Document } from "mongoose";
import { User } from "src/user/user.model";

const CourseSchema = new Schema(
    {
        title: String,
        description: String,
        price: Number,
        discount: Number,
        image: String,
        creator: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        toObject: {virtuals: true},
        timestamps: true,
        collection: 'courses',
    }
)

export { CourseSchema };
export interface Course extends Document {
    title: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    creator: User;
}