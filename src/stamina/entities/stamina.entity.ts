import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stamina')
export class StaminaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
