import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { EntityNotFoundError } from 'src/errors/entityNotFound';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const newUser = new User();

    createUserDto.password = createHash('md5')
      .update(createUserDto.password)
      .digest('hex');

    const userAlreadyExists = this.findByEmail(createUserDto.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    Object.assign(newUser, { ...createUserDto, created_at: new Date() });

    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new EntityNotFoundError();
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email && this.findByEmail(updateUserDto.email)) {
      throw new Error('Email already Exists');
    }

    const user = this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = createHash('md5')
        .update(updateUserDto.password)
        .digest('hex');
    }

    const newUpdatedUser: User = {
      ...user,
      ...updateUserDto,
    };

    const userIndex = this.users.indexOf(user);

    this.users[userIndex] = newUpdatedUser;

    return newUpdatedUser;
  }

  remove(id: string) {
    const userIndex = this.users.indexOf(this.findOne(id));

    this.users.splice(userIndex, 1);

    return { message: 'Deleted' };
  }
}
