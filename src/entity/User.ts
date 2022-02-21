import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Comment } from "./Comment";
import { Post } from "./Post";
import md5 from 'md5';
import _ from 'lodash';

type ValidateErrors = {
  username: string[],
  password: string[],
  confirmedPassword: string[],
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  username: string
  @Column('varchar')
  passwordDigest: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @OneToMany(() => Post, post => post.author)
  posts: Post[]
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]
  password: string
  confirmedPassword: string
  errors:ValidateErrors = {
    username: [],
    password: [],
    confirmedPassword: []
  }
  async validate() {
    if(this.username.trim().length < 6) {
      this.errors.username.push('用户名过短，必须大于等于6个字符');
    }
    if(this.password.length < 6) {
      this.errors.password.push('密码过短，必须大于等于6个字符');
    }
    if(this.password !== this.confirmedPassword) {
      this.errors.confirmedPassword.push('密码不匹配');
    }
    // 检查数据库是否有重复用户
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {where: {username: this.username}});
    if(user) {
      this.errors.username.push('用户已存在')
    }
  }
  hasErrors() {
    return Object.values(this.errors).find(error => error.length > 0);
  }
  getErrors() {
    return this.errors;
  }
  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }
  toJSON() {
    return _.omit(this, ['password', 'confirmedPassword', 'passwordDigest'])
  }
}
