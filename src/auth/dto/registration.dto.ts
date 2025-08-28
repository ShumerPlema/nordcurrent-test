import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-.;:'"<>/?[\]{}`~|])[\w!@#$%^&*()_+,\-.;:'"<>/?[\]{}`~|]{8,}$/,
  )
  password: string;
}
