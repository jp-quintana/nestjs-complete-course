import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Repository, In } from 'typeorm';
import { UpdateSongDTO } from './dto/update.dto';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Artists } from 'src/artists/artists.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Songs)
    private songsRepository: Repository<Songs>,
    @InjectRepository(Artists)
    private artistsRepository: Repository<Artists>,
  ) {}

  async findAll() {
    return await this.songsRepository.find();
  }

  async findOne(id: number) {
    return await this.songsRepository.findOneBy({ id });
  }

  async create(createSongDTO: CreateSongDTO) {
    const song = new Songs();

    const artists = await this.artistsRepository.findBy({
      id: In(createSongDTO.artists),
    });

    song.title = createSongDTO.title;
    song.artists = artists;
    song.releasedDate = createSongDTO.releasedDate;
    song.duration = createSongDTO.duration;
    song.lyrics = createSongDTO.lyrics;

    return await this.songsRepository.save(song);
  }

  async update(id: number, songToUpdate: UpdateSongDTO) {
    const updateData: Partial<Songs> = {
      title: songToUpdate.title,
      releasedDate: songToUpdate.releasedDate,
      duration: songToUpdate.duration,
      lyrics: songToUpdate.lyrics,
    };

    if (updateData?.artists.length > 0) {
      const artists = await this.artistsRepository.findBy({
        id: In(songToUpdate.artists),
      });

      updateData.artists = artists;
    }

    return this.songsRepository.update(id, updateData);
  }

  async delete(id: number) {
    return await this.songsRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');

    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return await paginate(queryBuilder, options);
  }
}
