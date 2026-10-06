import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { applications } from '../../domain/applications';

export abstract class applicationsRepository {
  abstract create(
    data: Omit<applications, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<applications>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<applications[]>;

  abstract findById(
    id: applications['id'],
  ): Promise<NullableType<applications>>;

  abstract findByIds(ids: applications['id'][]): Promise<applications[]>;

  abstract update(
    id: applications['id'],
    payload: DeepPartial<applications>,
  ): Promise<applications | null>;

  abstract remove(id: applications['id']): Promise<void>;
}
