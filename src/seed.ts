import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from "./entity/User";

createConnection().then(async connection => {
    // console.log(connection);
    const { manager } = connection;
    const user = new User();
    user.username = 'john';
    user.passwordDigest = 'xxx';
    await manager.save(user);
    console.log(user.id);
    connection.close();
}).catch(error => console.log(error));
