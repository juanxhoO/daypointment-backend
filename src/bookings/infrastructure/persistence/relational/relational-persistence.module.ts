import { Module } from '@nestjs/common';
import { BookingsRepository } from '../bookings.repository';
import { BookingsRelationalRepository } from './repositories/bookings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsEntity } from './entities/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsEntity])],
  providers: [
    {
      provide: BookingsRepository,
      useClass: BookingsRelationalRepository,
    },
  ],
  exports: [BookingsRepository],
})
export class RelationalBookingsPersistenceModule {}
