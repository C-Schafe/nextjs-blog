import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Comment } from "./Comment";
import { User } from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  title: string
  @Column('text')
  content: string
  @ManyToOne('User', 'posts')
  author: User
  @OneToMany('Comment', 'post')
  comments: Comment[]
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
}
