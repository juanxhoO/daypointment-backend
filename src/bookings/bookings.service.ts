import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterBookingDto, SortBookingDto } from './dto/query-booking.dto';
import { BookingRepository } from './infrastructure/persistence/booking.repository';
import { Booking } from './domain/booking';
import { BookingStatusEnum } from './booking-status.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { BookingStatus as Status } from './domain/booking-status';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async create(createUserDto: CreateBookingDto): Promise<Booking> {
    // Do not remove comment below.
    // <creating-property />

    let status: Status | undefined = undefined;

    if (createUserDto.status?.id) {
      const statusObject = Object.values(BookingStatusEnum)
        .map(String)
        .includes(String(createUserDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createUserDto.status.id,
      };
    }

    return this.bookingRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      timezone: createUserDto.timezone,
      status: status,
    } as any);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBookingDto | null;
    sortOptions?: SortBookingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Booking[]> {
    return this.bookingRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Booking['id']): Promise<NullableType<Booking>> {
    return this.bookingRepository.findById(id);
  }

  findByIds(ids: Booking['id'][]): Promise<Booking[]> {
    return this.bookingRepository.findByIds(ids);
  }

  async update(
    id: Booking['id'],
    updateUserDto: UpdateBookingDto,
  ): Promise<Booking | null> {
    // Do not remove comment below.
    // <updating-property />
    let status: Status | undefined = undefined;

    if (updateUserDto.status?.id) {
      const statusObject = Object.values(BookingStatusEnum)
        .map(String)
        .includes(String(updateUserDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: updateUserDto.status.id,
      };
    }

    return this.bookingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      timezone: updateUserDto.timezone,
      status,
    } as any);
  }

  async remove(id: Booking['id']): Promise<void> {
    await this.bookingRepository.remove(id);
  }
}
