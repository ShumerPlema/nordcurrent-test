import { Module } from '@nestjs/common';
import { StaminaService } from './stamina.service';
import { StaminaController } from './stamina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaminaEntity } from './entities/stamina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaminaEntity])],
  controllers: [StaminaController],
  providers: [StaminaService],
  exports: [StaminaService],
})
export class StaminaModule {}
