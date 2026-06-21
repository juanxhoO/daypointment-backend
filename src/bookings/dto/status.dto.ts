import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookingStatusDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
