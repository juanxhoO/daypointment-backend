import { Booking } from '../../../../domain/booking';
import { BookingEntity } from '../entities/booking.entity';
import { BookingStatusEntity } from '../entities/booking-status.entity';

export class BookingMapper {
  static toDomain(raw: BookingEntity): Booking {
    const domainEntity = new Booking();
    domainEntity.id = raw.id;
    // Map status
    if (raw.status) {
      domainEntity.status = raw.status;
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Booking): BookingEntity {
    let status: BookingStatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new BookingStatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    const persistenceEntity = new BookingEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.status = status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
