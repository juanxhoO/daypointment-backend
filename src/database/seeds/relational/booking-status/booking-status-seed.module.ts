import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatusSeedService } from './booking-status-seed.service';
import { BookingStatusEntity } from '../../../../bookings/infrastructure/persistence/relational/entities/booking-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingStatusEntity])],
  providers: [BookingStatusSeedService],
  exports: [BookingStatusSeedService],
})
export class BookingStatusSeedModule {}
