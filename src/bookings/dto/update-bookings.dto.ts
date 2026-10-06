// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateBookingsDto } from './create-bookings.dto';

export class UpdateBookingsDto extends PartialType(CreateBookingsDto) {}
