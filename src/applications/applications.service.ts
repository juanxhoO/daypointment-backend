import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateapplicationsDto } from './dto/create-applications.dto';
import { UpdateapplicationsDto } from './dto/update-applications.dto';
import { applicationsRepository } from './infrastructure/persistence/applications.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { applications } from './domain/applications';
import { StatusEnum } from '../statuses/statuses.enum';
import { Status } from '../statuses/domain/status';
import { UsersService } from '../users/users.service';
import {
  generateApiClient,
  generateApiSecret,
} from '../utils/generators/auth-generators';
@Injectable()
export class applicationsService {
  constructor(
    // Dependencies here
    private readonly applicationsRepository: applicationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createapplicationsDto: CreateapplicationsDto) {
    // Do not remove comment below.
    // <creating-property />

    let status: Status | undefined = undefined;
    if (createapplicationsDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createapplicationsDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createapplicationsDto.status.id,
      };
    }
    //Find User and all the data
    console.log('USER DATA:', createapplicationsDto);
    const user = await this.usersService.findById(
      createapplicationsDto.userId as string,
    );
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotExists',
        },
      });
    }

    // --- generate credentials on the server ---
    const apiClient = generateApiClient();
    const { hash: apiSecretHash } = generateApiSecret();

    return this.applicationsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createapplicationsDto.description,
      apiSecret: apiSecretHash,
      userId: createapplicationsDto.userId,
      apiClient: apiClient,
      status: status,
      name: createapplicationsDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.applicationsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: applications['id']) {
    return this.applicationsRepository.findById(id);
  }

  findByIds(ids: applications['id'][]) {
    return this.applicationsRepository.findByIds(ids);
  }

  async update(
    id: applications['id'],

    updateapplicationsDto: UpdateapplicationsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.applicationsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateapplicationsDto.description,
      name: updateapplicationsDto.name,
    });
  }

  remove(id: applications['id']) {
    return this.applicationsRepository.remove(id);
  }
}
