import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ApplicationsEntity } from '../entities/applications.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { applications } from '../../../../domain/applications';
import { applicationsRepository } from '../../applications.repository';
import { applicationsMapper } from '../mappers/applications.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class applicationsRelationalRepository implements applicationsRepository {
  constructor(
    @InjectRepository(ApplicationsEntity)
    private readonly applicationsRepository: Repository<ApplicationsEntity>,
  ) {}

  async create(data: applications): Promise<applications> {
    const persistenceModel = applicationsMapper.toPersistence(data);
    const newEntity = await this.applicationsRepository.save(
      this.applicationsRepository.create(persistenceModel),
    );
    return applicationsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<applications[]> {
    const entities = await this.applicationsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => applicationsMapper.toDomain(entity));
  }

  async findById(id: applications['id']): Promise<NullableType<applications>> {
    const entity = await this.applicationsRepository.findOne({
      where: { id },
    });

    return entity ? applicationsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: applications['id'][]): Promise<applications[]> {
    const entities = await this.applicationsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => applicationsMapper.toDomain(entity));
  }

  async update(
    id: applications['id'],
    payload: Partial<applications>,
  ): Promise<applications> {
    const entity = await this.applicationsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.applicationsRepository.save(
      this.applicationsRepository.create(
        applicationsMapper.toPersistence({
          ...applicationsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return applicationsMapper.toDomain(updatedEntity);
  }

  async remove(id: applications['id']): Promise<void> {
    await this.applicationsRepository.delete(id);
  }
}
