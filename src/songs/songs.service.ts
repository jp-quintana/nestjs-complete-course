import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create.dto';

@Injectable()
export class SongsService {
  private readonly songs = [];

  findAll() {
    return this.songs;
  }

  findOne(id: string) {
    return `Find one song based on id ${id}`;
    // return this.songs.find((song) => song.id === id);
  }

  create(song: CreateSongDTO) {
    this.songs.push(song);
    return this.songs;
  }

  update() {
    return 'Update existing song based on id';
  }

  delete() {
    return 'Delete existing song based on id';
  }
}
