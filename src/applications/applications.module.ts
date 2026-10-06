import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { applicationsService } from './applications.service';
import { applicationsController } from './applications.controller';
import { RelationalapplicationsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalapplicationsPersistenceModule,
    UsersModule,
  ],
  controllers: [applicationsController],
  providers: [applicationsService],
  exports: [applicationsService, RelationalapplicationsPersistenceModule],
})
export class applicationsModule {}
