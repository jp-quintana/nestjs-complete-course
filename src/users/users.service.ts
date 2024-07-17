import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from 'src/auth/dto/create.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async create(userDTO: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.usersRepository.save(userDTO);
    delete user.password;
    return user;
  }

  async findOne(data: LoginDTO) {
    console.log({ data });
    const user = await this.usersRepository.findOneBy({ email: data.email });
    console.log({ user });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
