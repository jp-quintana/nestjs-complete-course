import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Songs)
    private songsRepository: Repository<Songs>,
  ) {}

  findAll() {
    // throw new Error('hola');
    // return this.songs;
  }

  findOne(id: number) {
    return `Find one song based on id ${typeof id}`;
    // return this.songs.find((song) => song.id === id);
  }

  async create(songDTO: CreateSongDTO) {
    const song = this.songsRepository.create(songDTO);
    return await this.songsRepository.save(song);
  }

  update() {
    return 'Update existing song based on id';
  }

  delete() {
    return 'Delete existing song based on id';
  }
}
