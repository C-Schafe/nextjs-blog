import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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
}
