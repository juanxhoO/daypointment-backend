import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { applications } from '../../../../domain/applications';

import { ApplicationsEntity } from '../entities/applications.entity';

export class applicationsMapper {
  static toDomain(raw: ApplicationsEntity): applications {
    const domainEntity = new applications();
    domainEntity.description = raw.description;

    domainEntity.expiresAt = raw.expiresAt;
    domainEntity.apiSecret = raw.apiSecret;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.name = raw.name;
    domainEntity.userId = raw.user ? String(raw.user.id) : undefined;
    domainEntity.status = raw.status;
    domainEntity.apiClient = raw.apiClient;

    return domainEntity;
  }

  static toPersistence(domainEntity: applications): ApplicationsEntity {
    let status: StatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new StatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    let user: UserEntity | undefined = undefined;

    if (domainEntity.userId) {
      user = new UserEntity();
      user.id = Number(domainEntity.userId);
    }

    const persistenceEntity = new ApplicationsEntity();
    persistenceEntity.description = domainEntity.description;

    persistenceEntity.expiresAt = domainEntity.expiresAt;
    persistenceEntity.apiSecret = domainEntity.apiSecret;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.name = domainEntity.name;
    if (user) {
      persistenceEntity.user = user;
    }
    persistenceEntity.apiClient = domainEntity.apiClient;
    persistenceEntity.status = status;

    return persistenceEntity;
  }
}
