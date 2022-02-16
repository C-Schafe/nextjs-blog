import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  username: string
  @Column('varchar')
  passwordDigest: string
  @CreateDateColumn('time')
  createdAt: number
  @UpdateDateColumn('time')
  updatedAt: number
  @OneToMany(() => Post, post => post.author)
  posts: Post[]
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]
}
