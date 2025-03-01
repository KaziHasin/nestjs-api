import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from 'src/core/constants';
import { databaseProviders } from 'src/core/database/database.providers';
import { usersProviders } from './users.providers';

@Module({
  providers: [
    UsersService,
    // {
    //   provide: USER_REPOSITORY,
    //   useValue: User,
    // },
    ...usersProviders,
    ...databaseProviders,
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule { }
