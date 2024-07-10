import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    // private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ) {
    return this.usersService.create(userDTO);
  }
}
