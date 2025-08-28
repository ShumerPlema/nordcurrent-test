import { Global, Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [HashService],
  exports: [HashService],
})
export class CommonModule {}
