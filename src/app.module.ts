import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
