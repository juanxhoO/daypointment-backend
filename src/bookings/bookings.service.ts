import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateBookingsDto } from './dto/create-bookings.dto';
import { UpdateBookingsDto } from './dto/update-bookings.dto';
import { BookingsRepository } from './infrastructure/persistence/bookings.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Bookings } from './domain/bookings';

@Injectable()
export class BookingsService {
  constructor(
    // Dependencies here
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBookingsDto: CreateBookingsDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.bookingsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.bookingsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Bookings['id']) {
    return this.bookingsRepository.findById(id);
  }

  findByIds(ids: Bookings['id'][]) {
    return this.bookingsRepository.findByIds(ids);
  }

  async update(
    id: Bookings['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBookingsDto: UpdateBookingsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.bookingsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Bookings['id']) {
    return this.bookingsRepository.remove(id);
  }
}
