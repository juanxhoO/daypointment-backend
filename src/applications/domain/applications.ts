import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../statuses/domain/status';
import { IsOptional } from 'class-validator';

export class applications {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  expiresAt?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  apiSecret?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  apiClient?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;
}
