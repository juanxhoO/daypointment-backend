import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
