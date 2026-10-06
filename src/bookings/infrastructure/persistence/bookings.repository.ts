import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Bookings } from '../../domain/bookings';

export abstract class BookingsRepository {
  abstract create(
    data: Omit<Bookings, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Bookings>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Bookings[]>;

  abstract findById(id: Bookings['id']): Promise<NullableType<Bookings>>;

  abstract findByIds(ids: Bookings['id'][]): Promise<Bookings[]>;

  abstract update(
    id: Bookings['id'],
    payload: DeepPartial<Bookings>,
  ): Promise<Bookings | null>;

  abstract remove(id: Bookings['id']): Promise<void>;
}
