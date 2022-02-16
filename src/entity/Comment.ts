import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('text')
  content: string
  @ManyToOne(() => User, user => user.comments)
  user: number
  @ManyToOne(() => Post, post => post.comments)
  post: Post
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
}
