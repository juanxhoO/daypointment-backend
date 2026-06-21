import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsOptional } from 'class-validator';
import { BookingStatusDto } from './status.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiPropertyOptional({
    example: 'America/Argentina/Buenos_Aires',
    type: String,
  })
  @IsOptional()
  timezone: string | null;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  locationtype: string | null;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  locationValue: string | null;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  organizerId: string;

  @ApiPropertyOptional({
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

  @ApiPropertyOptional({
    type: String,
    example: 'notes',
  })
  @IsOptional()
  notes: string | null;

  @ApiPropertyOptional({
    type: Date,
  })
  @IsOptional()
  startAt: Date;

  @ApiPropertyOptional({
    example: {
      id: 1,
      name: 'Pending',
    },
  })
  @IsOptional()
  status: BookingStatusDto;

  @ApiPropertyOptional({
    type: Date,
  })
  @IsOptional()
  endAt: Date;
}
