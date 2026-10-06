import { Module } from '@nestjs/common';
import { applicationsRepository } from '../applications.repository';
import { applicationsRelationalRepository } from './repositories/applications.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsEntity } from './entities/applications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationsEntity])],
  providers: [
    {
      provide: applicationsRepository,
      useClass: applicationsRelationalRepository,
    },
  ],
  exports: [applicationsRepository],
})
export class RelationalapplicationsPersistenceModule {}
