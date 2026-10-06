import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { applicationsService } from './applications.service';
import { CreateapplicationsDto } from './dto/create-applications.dto';
import { UpdateapplicationsDto } from './dto/update-applications.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { applications } from './domain/applications';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllapplicationsDto } from './dto/find-all-applications.dto';
import { Request } from 'express';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

@ApiTags('Applications')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'applications',
  version: '1',
})
export class applicationsController {
  constructor(private readonly applicationsService: applicationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: applications,
  })
  create(
    @Body() createapplicationsDto: CreateapplicationsDto,
    @Req() request: Request,
  ) {
    const userId = (request.user as any).id;
    console.log('USER ID', userId);
    return this.applicationsService.create({
      ...createapplicationsDto,
      userId,
    });
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(applications),
  })
  async findAll(
    @Query() query: FindAllapplicationsDto,
  ): Promise<InfinityPaginationResponseDto<applications>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.applicationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: applications,
  })
  findById(@Param('id') id: string) {
    return this.applicationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: applications,
  })
  update(
    @Param('id') id: string,
    @Body() updateapplicationsDto: UpdateapplicationsDto,
  ) {
    return this.applicationsService.update(id, updateapplicationsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
