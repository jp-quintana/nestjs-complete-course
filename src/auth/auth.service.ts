import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { IPayload } from 'src/payload.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findOne(loginDTO);

    const passwordsMatch = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    delete user.password;

    const payload: IPayload = { email: user.email, userId: user.id };

    const artist = await this.artistsService.findArtist(user.id);
    if (artist) {
      payload.artistId = artist.id;
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
