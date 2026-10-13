import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  AppointmentStatus,
  AppointmentType,
} from '../../../../domain/bookings';

@Entity({
  name: 'bookings',
})
export class BookingsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  total: number;

  @Column()
  appId: string;

  @Column()
  description: string;

  @Column()
  appointmentId: string;

  @Column()
  userId: string;

  @Column()
  duration: number;

  @Column()
  type: AppointmentType;

  @Column()
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
