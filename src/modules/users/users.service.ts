import { Injectable } from '@nestjs/common';
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

    Object.assign(newUser, { ...createUserDto, created_at: new Date() });

    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
