import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Address } from './Address'
import { Cart } from './Cart'
import { Designer } from './Designer'
import { DesignReview } from './DesignReview'
import { Order } from './Order'
import { Return } from './Return'
import { Wallet } from './Wallet'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column({ name: 'password_hash' })
  passwordHash!: string

  @Column({ name: 'full_name' })
  fullName!: string

  @Column({ nullable: true })
  phone?: string

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string

  @Column({ name: 'is_active', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @OneToOne(() => Designer, designer => designer.user)
  designer?: Designer

  @OneToOne(() => Wallet, wallet => wallet.user)
  wallet?: Wallet

  @OneToMany(() => Address, address => address.user)
  addresses!: Address[]

  @OneToMany(() => Order, order => order.user)
  orders!: Order[]

  @OneToMany(() => Cart, cart => cart.user)
  carts!: Cart[]

  @OneToMany(() => DesignReview, review => review.user)
  reviews!: DesignReview[]

  @OneToMany(() => Return, return_ => return_.user)
  returns!: Return[]
}
