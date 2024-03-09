import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseSchema } from './course.model';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Course',
                schema: CourseSchema
            }
        ]),
    ],
    controllers: [CourseController],
    providers: [CourseService, CourseRepository],
    exports: [CourseService]
})
export class CourseModule { }
