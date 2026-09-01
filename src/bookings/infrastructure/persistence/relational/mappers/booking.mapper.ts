import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Booking } from '../../../../domain/booking';
import { BookingEntity } from '../entities/booking.entity';

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
    let status: StatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new StatusEntity();
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
