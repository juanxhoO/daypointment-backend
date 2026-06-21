import { BookingStatus } from './booking-status';
import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

export class Booking {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
  })
  timezone: string;

  @ApiProperty({
    type: String,
  })
  locationType: string;

  @ApiProperty({
    type: String,
  })
  locationValue: string;

  @ApiProperty({
    type: idType,
  })
  organizerId: number | string;

  @ApiProperty({
    type: [Object],
  })
  attendants: {
    id: number | string;
    name: string;
    email: string;
    [key: string]: any;
  }[];

  @ApiProperty({
    type: String,
  })
  notes: string;

  @ApiProperty({
    type: Date,
  })
  startAt: Date;

  @ApiProperty({
    type: Date,
  })
  endAt: Date;

  @ApiProperty({
    type: () => BookingStatus,
  })
  status?: BookingStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
