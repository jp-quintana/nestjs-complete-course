import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  findAll() {
    return 'Find all songs';
  }

  findOne(id: string) {
    return `Find one song based on id ${id}`;
  }
}
