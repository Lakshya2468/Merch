import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

export type AddressType = 'home' | 'work' | 'other'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'address_type', type: 'varchar', length: 20 })
  addressType!: AddressType

  @Column({ name: 'full_name' })
  fullName!: string

  @Column()
  phone!: string

  @Column({ name: 'address_line1' })
  addressLine1!: string

  @Column({ name: 'address_line2', nullable: true })
  addressLine2?: string

  @Column()
  city!: string

  @Column()
  state!: string

  @Column()
  country!: string

  @Column({ name: 'postal_code' })
  postalCode!: string

  @Column({ nullable: true })
  landmark?: string

  @Column({ name: 'is_default', default: false })
  isDefault!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user!: User
}
