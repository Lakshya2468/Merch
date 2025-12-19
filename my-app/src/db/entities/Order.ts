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
import { Address } from './Address'
import { Design } from './Design'
import { DesignReview } from './DesignReview'
import { DiscountUsage } from './DiscountUsage'
import { OrderTracking } from './OrderTracking'
import { Payment } from './Payment'
import { Product } from './Product'
import { Return } from './Return'
import { User } from './User'
import { WalletTransaction } from './WalletTransaction'

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
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'address_id' })
  addressId!: number

  @Column({ name: 'order_number', unique: true })
  orderNumber!: string

  @Column({ name: 'product_id' })
  productId!: number

  @Column({ name: 'design_id', nullable: true })
  designId?: number

  @Column({ name: 'custom_design_url', nullable: true })
  customDesignUrl?: string

  @Column({ name: 'design_configuration', type: 'json', nullable: true })
  designConfiguration?: string

  @Column({ name: 'selected_color', nullable: true })
  selectedColor?: string

  @Column({ name: 'selected_size', nullable: true })
  selectedSize?: string

  @Column({ type: 'int', default: 1 })
  quantity!: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  unitPrice!: number

  @Column({
    name: 'designer_commission',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  designerCommission!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax!: number

  @Column({
    name: 'shipping_cost',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  shippingCost!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: OrderStatus

  @Column({ name: 'ordered_at', nullable: true })
  orderedAt?: Date

  @Column({ name: 'delivered_at', nullable: true })
  deliveredAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address!: Address

  @ManyToOne(() => Product, product => product.orders)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @ManyToOne(() => Design, design => design.orders, { nullable: true })
  @JoinColumn({ name: 'design_id' })
  design?: Design

  @OneToOne(() => Payment, payment => payment.order)
  payment?: Payment

  @OneToOne(() => Return, return_ => return_.order)
  return?: Return

  @OneToOne(() => OrderTracking, tracking => tracking.order)
  tracking?: OrderTracking

  @OneToOne(() => DiscountUsage, discountUsage => discountUsage.order)
  discountUsage?: DiscountUsage

  @OneToMany(() => WalletTransaction, transaction => transaction.order)
  walletTransactions!: WalletTransaction[]

  @OneToMany(() => DesignReview, review => review.order)
  designReviews!: DesignReview[]
}
