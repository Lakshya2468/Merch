import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { User } from './User'

export type AddressType = 'home' | 'work' | 'other'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ type: 'varchar', length: 20 })
  addressType!: AddressType

  @Column()
  fullName!: string

  @Column()
  phone!: string

  @Column()
  addressLine1!: string

  @Column({ nullable: true })
  addressLine2?: string

  @Column()
  city!: string

  @Column()
  state!: string

  @Column()
  country!: string

  @Column()
  postalCode!: string

  @Column({ nullable: true })
  landmark?: string

  @Column({ default: false })
  isDefault!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @ManyToOne('User', (user: User) => user.addresses)
  @JoinColumn()
  user!: User
}
