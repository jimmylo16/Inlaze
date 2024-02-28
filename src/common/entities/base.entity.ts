import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseModel } from '../models/base.model';

export class BaseEntity implements BaseModel {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date', default: null, nullable: true })
  deletedAt?: Date;
}
