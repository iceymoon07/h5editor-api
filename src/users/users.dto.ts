import { ApiProperty } from "@nestjs/swagger";

/**
 * @description 注册账号 DTO
 */
export class UserDto {
    @ApiProperty({ description: '用户名' })
    name: string
    @ApiProperty({ description: '密码' })
    password: string
    @ApiProperty({ description: '再次输入的密码' })
    repassword: string
}

/**
 * @description 登录 DTO
 */
export class LoginDto {
    @ApiProperty({ description: '用户名' })
    name: string
    @ApiProperty({ description: '密码' })
    password: string
}

/**
 * @description 修改密码 DTO
 */
export class ResetPasswordDto {
    @ApiProperty({ description: '密码' })
    password: string
    @ApiProperty({ description: '再次输入的密码' })
    repassword: string
}
