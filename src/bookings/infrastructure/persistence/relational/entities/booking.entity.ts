import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingStatusEntity } from './booking-status.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'booking',
})
export class BookingEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  timezone: string | null;

  @Column({ nullable: true })
  locationType?: string;

  @Column({ nullable: true })
  locationValue: string;

  @Column('simple-array', { nullable: true })
  attendants?: string[] | null;

  @Index()
  @Column({ type: String, nullable: true })
  organizerId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  notes: string | null;

  @ManyToOne(() => BookingStatusEntity, {
    eager: true,
  })
  status?: BookingStatusEntity;

  @CreateDateColumn()
  startAt: Date;

  @UpdateDateColumn()
  endAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
