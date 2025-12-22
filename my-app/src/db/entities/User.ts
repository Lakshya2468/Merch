import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Address } from './Address'
import type { Cart } from './Cart'
import type { Designer } from './Designer'
import type { DesignReview } from './DesignReview'
import type { Order } from './Order'
import type { Return } from './Return'
import type { Wallet } from './Wallet'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @Column()
  passwordHash!: string

  @Column()
  fullName!: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  avatarUrl?: string

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @OneToOne('Designer', (designer: Designer) => designer.user)
  designer?: Designer

  @OneToOne('Wallet', (wallet: Wallet) => wallet.user)
  wallet?: Wallet

  @OneToMany('Address', (address: Address) => address.user)
  addresses!: Address[]

  @OneToMany('Order', (order: Order) => order.user)
  orders!: Order[]

  @OneToMany('Cart', (cart: Cart) => cart.user)
  carts!: Cart[]

  @OneToMany('DesignReview', (review: DesignReview) => review.user)
  reviews!: DesignReview[]

  @OneToMany('Return', (return_: Return) => return_.user)
  returns!: Return[]
}
