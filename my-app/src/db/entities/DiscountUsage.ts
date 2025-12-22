import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import type { Discount } from './Discount'
import type { Order } from './Order'
import type { User } from './User'

@Entity({ name: 'discount_usage' })
export class DiscountUsage {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  discountId!: string

  @Column()
  userId!: string

  @Column({ unique: true })
  orderId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountAmount!: number

  @Column()
  usedAt!: Date

  // Relationships
  @ManyToOne('Discount', (discount: Discount) => discount.usages)
  @JoinColumn()
  discount!: Discount

  @ManyToOne('User')
  @JoinColumn()
  user!: User

  @OneToOne('Order', (order: Order) => order.discountUsage)
  @JoinColumn()
  order!: Order
}
