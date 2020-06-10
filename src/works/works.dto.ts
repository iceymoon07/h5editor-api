import { ApiProperty } from "@nestjs/swagger";

export class WorkDto {
    @ApiProperty({ description: '作品标题' })
    title: string
    @ApiProperty({ description: '页面列表' })
    pageList: object[]
}