import { getModelForClass, prop } from '@typegoose/typegoose'

export class Work {
    @prop({ required: true })
    title!: string
    @prop({ required: true })
    pageList!: object[]
}

export const WorkModel = getModelForClass(Work)