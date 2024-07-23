import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artists)
    private artistsRepository: Repository<Artists>,
  ) {}

  findArtist(userId: number): Promise<Artists> {
    return this.artistsRepository.findOneBy({ user: { id: userId } });
  }
}
