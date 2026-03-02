import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';
import { Http2ServerRequest } from 'http2';
import type { User } from '../../types/usersType';
import path from 'path';
import { CreateUserDto } from 'dto/create-user.dto';
import { UpdateUserDto } from 'dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.usersService.findAll();
    }


    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number): User {
        return this.usersService.findOne(id);
    }

    @Post() 
    create(@Body() CreateUser: CreateUserDto): User {
        return this.usersService.create(CreateUser);
    }

    @Patch('update/:id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UpdateUserDto): User {
        return this.usersService.update(id, updateUser);
    }
}

