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

  async findAll() {
    return await this.songsRepository.find();
  }

  async findOne(id: number) {
    return await this.songsRepository.findOneBy({ id });
  }

  async create(songDTO: CreateSongDTO) {
    const song = this.songsRepository.create(songDTO);
    return await this.songsRepository.save(song);
  }

  update() {
    return 'Update existing song based on id';
  }

  async delete(id: number) {
    return await this.songsRepository.delete(id);
  }
}
