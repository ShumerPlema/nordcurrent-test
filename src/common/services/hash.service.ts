import { Injectable } from '@nestjs/common';
import { scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import config from '../config';

const scryptAsync = promisify(scrypt);

@Injectable()
export class HashService {
  async hash(password: string) {
    console.log(config.AUTH.SALT);
    const buf = (await scryptAsync(
      password,
      config.AUTH.SALT as string,
      64,
    )) as Buffer;
    return buf.toString('hex');
  }

  async comparePasswords(password: string, hashPassword: string) {
    const hashedPasswordBuf = Buffer.from(hashPassword, 'hex');
    const suppliedPasswordBuf = (await scryptAsync(
      password,
      config.AUTH.SALT as string,
      64,
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}
