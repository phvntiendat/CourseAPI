import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "src/user/user.model";
import { CreateCourseDto, UpdateCourseDto } from "./course.dto";
import { CourseRepository } from "./course.repository";

@Injectable()
export class CourseService {
    constructor(
        private readonly courseRepository: CourseRepository,
    ) { }

    async createCourse(user: User, dto: CreateCourseDto) {
        if(!dto.discount) dto.discount = 0
        dto.creator = user.id
        return await this.courseRepository.create(dto)
    }

    async getAllCourses(page: number, limit: number = 10) {
        const count = await this.courseRepository.countDocuments({})
        const countPage = Math.ceil(count / limit)
        const courses = await this.courseRepository.getByCondition(
            null,
            ['image', 'title', 'creator', 'description', 'price', 'discount'],
            {
                sort: {
                    _id: -1,
                },
                skip: (page - 1) * limit,
                limit: limit
            },
            [
                {
                    path: 'creator',
                    select: 'first_name last_name avatar'
                }
            ]
        );

        return {
            count, countPage, courses
        }
    }

    async deleteCourse(user: User, id: string) {
        // await this.checkOwnership(user, id);
        return await this.courseRepository.deleteOne(id);
    }

    // async checkOwnership(user: User, id: string) {
    //     const course = await this.courseRepository.findById(id)
    //     if (!course.creator.equals(user._id)) throw new HttpException('No Permission', HttpStatus.UNAUTHORIZED);
    //     return true
    // }

    async updateCourse(user: User, id: string, course: UpdateCourseDto) {
        // await this.checkOwnership(user, id);
        return await this.courseRepository.findByIdAndUpdate(id, course)
    }

    async searchCourse(keyword: string, page: number, limit: number = 10) {
        let query = { title: { $regex: new RegExp(keyword, 'i') } }
        const count = await this.courseRepository.countDocuments(query)
        const countPage = Math.ceil(count / limit)
        const courses = await this.courseRepository.getByCondition(
            query,
            ['image', 'title', 'creator', 'description', 'price', 'discount'],
            {
                sort: {
                    _id: -1,
                },
                skip: (page - 1) * limit,
                limit: limit
            },
            [
                {
                    path: 'creator',
                    select: 'first_name last_name avatar'
                }
            ]
        );

        return {
            count, countPage, courses
        }
    }

    async getCourseById(id: string) {
        const courseCheck = await this.courseRepository.findById(id);
        if (!courseCheck) { 
            throw new HttpException('No course with this id', HttpStatus.BAD_REQUEST);
        }
        return await this.courseRepository.getByCondition(
            {
                _id: id
            },
            null,
            null,
            [
                {
                    path: 'creator',
                    select: 'first_name last_name avatar'
                }
            ]
        )
    }    
} 
