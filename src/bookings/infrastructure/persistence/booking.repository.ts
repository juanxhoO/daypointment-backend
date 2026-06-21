import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Booking } from '../../domain/booking';

import { FilterBookingDto, SortBookingDto } from '../../dto/query-booking.dto';

export abstract class BookingRepository {
  abstract create(
    data: Omit<Booking, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Booking>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBookingDto | null;
    sortOptions?: SortBookingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Booking[]>;

  abstract findById(id: Booking['id']): Promise<NullableType<Booking>>;
  abstract findByIds(ids: Booking['id'][]): Promise<Booking[]>;
  abstract update(
    id: Booking['id'],
    payload: DeepPartial<Booking>,
  ): Promise<Booking | null>;
  abstract remove(id: Booking['id']): Promise<void>;
}
