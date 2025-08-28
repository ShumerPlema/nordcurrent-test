import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './common/config';
import { StaminaModule } from './stamina/stamina.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +config.DB.PORT,
      host: config.DB.HOST,
      username: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: false,
      synchronize: true,
    }),
    StaminaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
