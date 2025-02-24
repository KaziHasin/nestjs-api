import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.entity';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useValue: User, // Ensure User entity is used as repository
    },
    ...databaseProviders, // If using Sequelize or TypeORM
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule { }
