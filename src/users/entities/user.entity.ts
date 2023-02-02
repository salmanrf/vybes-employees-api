import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 25, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date | string;

  @CreateDateColumn()
  updated_at: Date | string;
}
