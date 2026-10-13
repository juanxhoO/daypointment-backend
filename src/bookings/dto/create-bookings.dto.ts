import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AppointmentType } from '../domain/bookings';
import { Status } from '../../statuses/domain/status';

export class CreateBookingsDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @IsNotEmpty()
  @IsString()
  externalAppId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  appointmentId: string;

  @IsNotEmpty()
  @IsString()
  appId: string;

  @IsNotEmpty()
  @IsEnum(AppointmentType)
  type: AppointmentType;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
