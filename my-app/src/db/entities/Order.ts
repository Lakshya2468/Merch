import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Address } from './Address'
import type { Design } from './Design'
import type { DesignReview } from './DesignReview'
import type { DiscountUsage } from './DiscountUsage'
import type { OrderTracking } from './OrderTracking'
import type { Payment } from './Payment'
import type { Product } from './Product'
import type { Return } from './Return'
import type { User } from './User'
import type { WalletTransaction } from './WalletTransaction'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  addressId!: string

  @Column({ unique: true })
  orderNumber!: string

  @Column()
  productId!: string

  @Column({ nullable: true })
  designId?: string

  @Column({ nullable: true })
  customDesignUrl?: string

  @Column({ type: 'json', nullable: true })
  designConfiguration?: string

  @Column({ nullable: true })
  selectedColor?: string

  @Column({ nullable: true })
  selectedSize?: string

  @Column({ type: 'int', default: 1 })
  quantity!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  designerCommission!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  shippingCost!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: OrderStatus

  @Column({ nullable: true })
  orderedAt?: Date

  @Column({ nullable: true })
  deliveredAt?: Date

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @ManyToOne('User', (user: User) => user.orders)
  @JoinColumn()
  user!: User

  @ManyToOne('Address')
  @JoinColumn()
  address!: Address

  @ManyToOne('Product', (product: Product) => product.orders)
  @JoinColumn()
  product!: Product

  @ManyToOne('Design', (design: Design) => design.orders, { nullable: true })
  @JoinColumn()
  design?: Design

  @OneToOne('Payment', (payment: Payment) => payment.order)
  payment?: Payment

  @OneToOne('Return', (return_: Return) => return_.order)
  return?: Return

  @OneToOne('OrderTracking', (tracking: OrderTracking) => tracking.order)
  tracking?: OrderTracking

  @OneToOne(
    'DiscountUsage',
    (discountUsage: DiscountUsage) => discountUsage.order
  )
  discountUsage?: DiscountUsage

  @OneToMany(
    'WalletTransaction',
    (transaction: WalletTransaction) => transaction.order
  )
  walletTransactions!: WalletTransaction[]

  @OneToMany('DesignReview', (review: DesignReview) => review.order)
  designReviews!: DesignReview[]
}
