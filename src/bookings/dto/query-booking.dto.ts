import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Booking } from '../domain/booking';
import { RoleDto } from '../../roles/dto/role.dto';

export class FilterBookingDto {
  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;
}

export class SortBookingDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Booking;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBookingDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterBookingDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterBookingDto)
  filters?: FilterBookingDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortBookingDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortBookingDto)
  sort?: SortBookingDto[] | null;
}
