import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { RelationalBookingsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalBookingsPersistenceModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, RelationalBookingsPersistenceModule],
})
export class BookingsModule {}
