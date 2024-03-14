import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
import { Body, Controller, Get, Param, Patch, Query, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async updateUserInfo(@Req() req: any, @Body() user: UpdateUserDto) {
        return this.userService.updateUserInfo(req.user, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Req() req: any) {
        return this.userService.getProfile(req.user);
    }
}