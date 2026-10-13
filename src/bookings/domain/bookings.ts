import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../statuses/domain/status';

export class Bookings {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  appId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  appointmentId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty({
    enum: () => AppointmentType,
  })
  type?: AppointmentType;
}
export enum AppointmentType {
  SINGLE = 'SINGLE',
  RECURRING = 'RECURRING',
}

export enum AppointmentStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}
