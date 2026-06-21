import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingStatusEntity } from '../../../../bookings/infrastructure/persistence/relational/entities/booking-status.entity';
import { BookingStatusEnum } from '../../../../bookings/booking-status.enum';

@Injectable()
export class BookingStatusSeedService {
  constructor(
    @InjectRepository(BookingStatusEntity)
    private readonly repository: Repository<BookingStatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: BookingStatusEnum.PENDING,
          name: 'Pending',
        }),
        this.repository.create({
          id: BookingStatusEnum.CONFIRMED,
          name: 'Confirmed',
        }),
        this.repository.create({
          id: BookingStatusEnum.CANCELLED,
          name: 'Cancelled',
        }),
        this.repository.create({
          id: BookingStatusEnum.COMPLETED,
          name: 'Completed',
        }),
        this.repository.create({
          id: BookingStatusEnum.NO_SHOW,
          name: 'No Show',
        }),
      ]);
    }
  }
}
