import { BaseEntity } from '@common/entities';
import { ID } from '@common/types';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 64 })
  firstName: string;

  @Column({ nullable: true, length: 64 })
  lastName: string;

  @Column({ nullable: true, length: 32, unique: true })
  username: string;

  @Column({ nullable: true, length: 64 })
  preferredName: string;

  @Column({ unique: true })
  chatId: ID;
}
