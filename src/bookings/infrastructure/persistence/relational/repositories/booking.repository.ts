import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterBookingDto,
  SortBookingDto,
} from '../../../../dto/query-booking.dto';
import { Booking } from '../../../../domain/booking';
import { BookingRepository } from '../../booking.repository';
import { BookingMapper } from '../mappers/booking.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BookingsRelationalRepository implements BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingsRepository: Repository<BookingEntity>,
  ) {}

  async create(data: Booking): Promise<Booking> {
    const persistenceModel = BookingMapper.toPersistence(data);
    const newEntity = await this.bookingsRepository.save(
      this.bookingsRepository.create(persistenceModel),
    );
    return BookingMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBookingDto | null;
    sortOptions?: SortBookingDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Booking[]> {
    const where: FindOptionsWhere<BookingEntity> = {};

    const entities = await this.bookingsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((booking) => BookingMapper.toDomain(booking));
  }

  async findById(id: Booking['id']): Promise<NullableType<Booking>> {
    const entity = await this.bookingsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? BookingMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Booking['id'][]): Promise<Booking[]> {
    const entities = await this.bookingsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((booking) => BookingMapper.toDomain(booking));
  }

  async update(id: Booking['id'], payload: Partial<Booking>): Promise<Booking> {
    const entity = await this.bookingsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('User not found');
    }

    const updatedEntity = await this.bookingsRepository.save(
      this.bookingsRepository.create(
        BookingMapper.toPersistence({
          ...BookingMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return BookingMapper.toDomain(updatedEntity);
  }

  async remove(id: Booking['id']): Promise<void> {
    await this.bookingsRepository.softDelete(id);
  }
}
