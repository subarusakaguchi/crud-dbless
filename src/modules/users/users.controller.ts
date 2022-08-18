import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createHash } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = createHash('md5')
      .update(createUserDto.password)
      .digest('hex');

    const userAlreadyExists = this.usersService.findByEmail(
      createUserDto.email,
    );

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (
      updateUserDto.email &&
      this.usersService.findByEmail(updateUserDto.email)
    ) {
      throw new Error('Email already Exists');
    }

    if (updateUserDto.password) {
      updateUserDto.password = createHash('md5')
        .update(updateUserDto.password)
        .digest('hex');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
