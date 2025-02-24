import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,) { }

    async validateUser(username: string, enteredPassword: string) {
        const user = await this.usersService.findOneByEmail(username);

        if (!user) return null;


        const match = await this.comparePassword(enteredPassword, user.password);
        if (!match) return null;


        const { password, ...result } = user['dataValues'];
        return result;

    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { token, user };
    }


    public async create(user) {
        const hashedPassword = await this.hashPassword(user.password);

        const newUser = await this.usersService.create({ ...user, password: hashedPassword });

        const { password, ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return { user: result, token };


    }


    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }


    private async hashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }


    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }


}
