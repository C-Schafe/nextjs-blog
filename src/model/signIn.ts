import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { User } from "../entity/User";
import md5 from 'md5';
import _ from 'lodash';

type ValidateErrors = {
  username: string[],
  password: string[],
}

export class SignIn {
  username: string;
  password: string;
  errors: ValidateErrors = {
    username: [],
    password: [],
  }

  async validate() {
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, { where: { username: this.username } });
    if (user) {
      if (user.passwordDigest !== md5(this.password)) {
        this.errors.password.push('请输入正确的用户名或密码');
      }
    } else {
      this.errors.username.push('用户不存在');
    }
  }
  hasErrors() {
    return Object.values(this.errors).find(error => error.length > 0);
  }
  getErrors() {
    return this.errors;
  }
  toJSON() {
    return _.omit(this, ['password']);
  }
}