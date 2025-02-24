import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from 'src/core/constants';
@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(userDto: UserDto): Promise<User> {
        return await this.userRepository.create<User>(userDto as any);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User | null> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
