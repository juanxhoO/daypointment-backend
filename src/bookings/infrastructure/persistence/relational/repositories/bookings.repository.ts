import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BookingsEntity } from '../entities/bookings.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Bookings } from '../../../../domain/bookings';
import { BookingsRepository } from '../../bookings.repository';
import { BookingsMapper } from '../mappers/bookings.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BookingsRelationalRepository implements BookingsRepository {
  constructor(
    @InjectRepository(BookingsEntity)
    private readonly bookingsRepository: Repository<BookingsEntity>,
  ) {}

  async create(data: Bookings): Promise<Bookings> {
    const persistenceModel = BookingsMapper.toPersistence(data);
    const newEntity = await this.bookingsRepository.save(
      this.bookingsRepository.create(persistenceModel),
    );
    return BookingsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Bookings[]> {
    const entities = await this.bookingsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => BookingsMapper.toDomain(entity));
  }

  async findById(id: Bookings['id']): Promise<NullableType<Bookings>> {
    const entity = await this.bookingsRepository.findOne({
      where: { id },
    });

    return entity ? BookingsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Bookings['id'][]): Promise<Bookings[]> {
    const entities = await this.bookingsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => BookingsMapper.toDomain(entity));
  }

  async update(
    id: Bookings['id'],
    payload: Partial<Bookings>,
  ): Promise<Bookings> {
    const entity = await this.bookingsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.bookingsRepository.save(
      this.bookingsRepository.create(
        BookingsMapper.toPersistence({
          ...BookingsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return BookingsMapper.toDomain(updatedEntity);
  }

  async remove(id: Bookings['id']): Promise<void> {
    await this.bookingsRepository.delete(id);
  }
}
