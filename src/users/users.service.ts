import { Injectable } from '@nestjs/common';
import { User, UserModel } from './users.model';

@Injectable()
export class UsersService {
    async create(user: User) {
        await UserModel.create(user)
    }
    async delete(id: string) {
        await UserModel.findByIdAndDelete(id)
    }

    async update(id: string, user: User) {
        await UserModel.findByIdAndUpdate(id, user)
    }

    async resetPassword(id: string, password: string) {
        await UserModel.findByIdAndUpdate(id, { password: password })
    }

    async findOne(id: string) {
        return await UserModel.findById(id)
    }

    async findAll() {
        return await UserModel.find()
    }

    async findOneByUserName(name: string) {
        return await UserModel.findOne({ name: name })
    }

    async loginValidate(user: User) {
        return await UserModel.findOne(user)
    }
}
