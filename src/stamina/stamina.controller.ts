import { Controller } from '@nestjs/common';
import { StaminaService } from './stamina.service';

@Controller('stamina')
export class StaminaController {
  constructor(private readonly staminaService: StaminaService) {}
}
