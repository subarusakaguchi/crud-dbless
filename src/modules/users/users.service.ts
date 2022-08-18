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
    return this.users;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    const userIndex = this.users.indexOf(this.findOne(id));

    this.users.splice(userIndex, 1);

    return { message: 'Deleted' };
  }
}
