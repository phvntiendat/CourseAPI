import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository'
import { Course } from 'src/course/course.model';


@Injectable()
export class CourseRepository extends BaseRepository<Course> {
    constructor(
        @InjectModel('Course')
        private readonly courseModel: Model<Course>,
    ) {
        super(courseModel);
    }

    async countDocuments(filter) {
        return this.courseModel.countDocuments(filter);
    }
}