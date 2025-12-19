import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Discount } from './Discount'
import { Order } from './Order'
import { User } from './User'

@Entity({ name: 'discount_usage' })
export class DiscountUsage {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'discount_id' })
  discountId!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'order_id', unique: true })
  orderId!: number

  @Column({ name: 'discount_amount', type: 'decimal', precision: 10, scale: 2 })
  discountAmount!: number

  @Column({ name: 'used_at' })
  usedAt!: Date

  // Relationships
  @ManyToOne(() => Discount, discount => discount.usages)
  @JoinColumn({ name: 'discount_id' })
  discount!: Discount

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToOne(() => Order, order => order.discountUsage)
  @JoinColumn({ name: 'order_id' })
  order!: Order
}
