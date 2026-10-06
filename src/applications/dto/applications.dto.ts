import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class applicationsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
