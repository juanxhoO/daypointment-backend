import { Bookings } from '../../../../domain/bookings';
import { BookingsEntity } from '../entities/bookings.entity';

export class BookingsMapper {
  static toDomain(raw: BookingsEntity): Bookings {
    const domainEntity = new Bookings();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Bookings): BookingsEntity {
    const persistenceEntity = new BookingsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
