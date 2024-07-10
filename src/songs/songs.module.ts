import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Artists } from 'src/artists/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Songs, Artists])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
