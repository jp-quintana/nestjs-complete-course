import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from 'src/users/users.entity';
import { Songs } from 'src/songs/songs.entity';

@Entity('artists')
export class Artists {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToMany(() => Songs, (song) => song.artists)
  songs: Songs[];
}
