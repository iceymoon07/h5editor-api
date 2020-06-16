import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { WorksService } from './works.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorkDto } from './works.dto';

@Controller('works')
@ApiTags('作品')
export class WorksController {
    constructor(private readonly worksService: WorksService) { }

    @Get('/')
    @ApiOperation({ summary: '列出所有作品' })
    async findAll() {
        return await this.worksService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: '根据 id 查找作品' })
    async findOne(@Param('id') id: string) {
        return await this.worksService.findOne(id)
    }

    @Post('/')
    @ApiOperation({ summary: '创建新作品' })
    async create(@Body() createWorkDto: WorkDto) {
        await this.worksService.create(createWorkDto)
        return {
            message: '创建成功'
        }
    }

    @Put(':id')
    @ApiOperation({ summary: '修改对应 id 的作品' })
    async update(@Param('id') id: string, @Body() updateWorkDto: WorkDto) {
        await this.worksService.update(id, updateWorkDto)
        return {
            message: '修改成功'
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除对应 id 的作品' })
    async delete(@Param('id') id: string) {
        await this.worksService.delete(id)
        return {
            message: '删除成功'
        }
    }
}
