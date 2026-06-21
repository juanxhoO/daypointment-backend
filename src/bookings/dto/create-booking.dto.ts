import { ApiProperty } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { BookingStatusDto } from './status.dto';

export class CreateBookingDto {
  @ApiProperty({ example: 'America/Argentina/Buenos_Aires', type: String })
  @IsNotEmpty()
  timezone: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  locationtype: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  locationValue: string | null;

  @ApiProperty({
    example: 1,
  })
  organizerId: string;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'John',
        email: '[EMAIL_ADDRESS]',
      },
    ],
  })
  attendants: {
    id: number | string;
    name: string;
    email: string;
    [key: string]: any;
  }[];

  @ApiProperty({
    type: String,
    example: 'notes',
  })
  @IsOptional()
  notes: string | null;

  @ApiProperty({
    type: Date,
  })
  startAt: Date;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Pending',
    },
  })
  status: BookingStatusDto;

  @ApiProperty({
    type: Date,
  })
  endAt: Date;
}
