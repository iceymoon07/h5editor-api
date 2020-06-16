import { getModelForClass, prop } from '@typegoose/typegoose'

export class Work {
    @prop()
    title: string
    @prop()
    pageList: any
    @prop()
    firstPageThumb: string
}

export const WorkModel = getModelForClass(Work)