import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthUserDto {
    @IsString()
  @IsNotEmpty()
    nameUser: string
    @IsString()
  @IsNotEmpty() 
    password: string  
}
