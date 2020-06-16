import { Controller, Get, Param, Post, Body, Delete, Req, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserDto, LoginDto, ResetPasswordDto } from './users.dto';
import { Request, Response } from 'express';

@Controller('users')
@ApiTags('用户注册登录')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get('/')
    @ApiOperation({ summary: '列出所有用户信息' })
    async findAll() {
        return await this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: '根据 id 查找用户' })
    async findOne(@Param('id') id: string) {
        return await this.usersService.findOne(id)
    }

    @Post('/')
    @ApiOperation({ summary: '注册新用户' })
    async create(@Body() createUserDto: UserDto, @Res() res: Response) {
        const { name, password, repassword } = createUserDto
        if (password !== repassword) {
            res.status(400).send({
                message: "两次输入的密码不一致"
            })
            return
        }
        const existedUser = await this.usersService.findOneByUserName(name)
        if (existedUser) {
            res.status(400).send({
                message: "该用户名已被注册"
            })
            return
        }
        this.usersService.create({
            name: name,
            password: password,
        })
        res.send({
            message: '注册成功'
        })
    }

    @Get('valid/existedusername/:name')
    @ApiOperation({ summary: '查询用户名是否已被注册' })
    async findUserNameIsExisted(@Param('name') name: string) {
        const existedUser = await this.usersService.findOneByUserName(name)
        if (existedUser) {
            return true
        } else {
            return false
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除对应 id 的用户' })
    async delete(@Param('id') id: string) {
        await this.usersService.delete(id)
        return {
            message: '删除成功'
        }
    }

    @Put('/')
    @ApiOperation({ summary: '用户修改密码' })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Req() req: Request, @Res() res: Response) {
        const { curPassword } = resetPasswordDto
        const id = req.session.userId
        const user = await this.usersService.findOne(id)
        const correctPassword = user.password
        if (curPassword !== correctPassword) {
            res.status(400).send({
                message: '旧密码错误'
            })
            return
        }
        const { password, repassword } = resetPasswordDto
        if (password !== repassword) {
            res.status(400).send({
                message: "两次输入的密码不一致"
            })
            return
        }
        await this.usersService.resetPassword(id, password)
        res.send({
            message: '密码修改成功'
        })
    }

    @Post('auth/login')
    @ApiOperation({ summary: '登录' })
    async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
        const user = await this.usersService.loginValidate(loginDto)
        if (user) {
            req.session.isLogin = true
            req.session.userName = user.name
            req.session.userId = user._id
            res.send({
                message: '登录成功'
            })
        } else {
            res.status(404).send({
                message: '账号或密码错误'
            })
        }
    }


    @Get('auth/logout')
    @ApiOperation({ summary: '退出登录' })
    async logout(@Req() req: Request) {
        req.session.destroy((err) => { })
        return {
            message: '已退出登录'
        }
    }

    @Get('auth/state')
    @ApiOperation({ summary: '查询登录状态' })
    async loginState(@Req() req: Request) {
        if (req.session.isLogin) {
            return {
                isLogin: req.session.isLogin,
                userName: req.session.userName,
                userId: req.session.userId
            }
        } else {
            return {
                isLogin: false,
                userName: null,
                userId: null
            }
        }
    }
}

