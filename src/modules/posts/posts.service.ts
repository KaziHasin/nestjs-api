import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/constants';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) { }

    async create(post: PostDto, userId): Promise<Post> {
        return await this.postRepository.create<Post>({ ...post as any, userId });
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.findAll<Post>({
            include: [{ model: User, attributes: { exclude: ['password'] } }]
        });
    }

    async findOne(id: number): Promise<Post | null> {
        return await this.postRepository.findOne<Post>({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }]
        });
    }

    async delete(id, userId) {
        return await this.postRepository.destroy({ where: { id, userId } });
    }


    async update(id: number, data: any, userId: number) {

        const [numberOfAffectedRows, updatedPosts] = await this.postRepository.update(
            { ...data },
            { where: { id }, returning: true }
        );

        console.log("🔹 Update Result:", { numberOfAffectedRows, updatedPosts });

        return {
            numberOfAffectedRows,
            updatedPost: updatedPosts[0] ?? null,
        };
    }

}
