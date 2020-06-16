import { Injectable } from '@nestjs/common';
import { Work, WorkModel } from './works.model';

@Injectable()
export class WorksService {
    async create(work: Work) {
        await WorkModel.create(work)
    }

    async delete(id: string) {
        await WorkModel.findByIdAndDelete(id)
    }

    async update(id: string, work: Work) {
        await WorkModel.findByIdAndUpdate(id, work)
    }

    async findOne(id: string) {
        return await WorkModel.findById(id)
    }

    async findAll() {
        return await WorkModel.find()
    }
}
