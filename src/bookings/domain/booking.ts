
import { Status } from '../../statuses/domain/status';
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
    type: [idType],
  })
  attendants: number[] | string[];

  @ApiProperty({
    type: String,
  })
  notes: string;


  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
