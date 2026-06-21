import {
  // common
  Module,
} from '@nestjs/common';

import { BookingsController } from './booking.controller';
import { BookingsService } from './bookings.service';
import { RelationalBookingPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalBookingPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, infrastructurePersistenceModule],
})
export class BookingsModule {}
