import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Order } from './Order'

export type TrackingStatus =
  | 'order_placed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'

@Entity({ name: 'order_tracking' })
export class OrderTracking {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  orderId!: string

  @Column({ nullable: true })
  trackingNumber?: string

  @Column({ nullable: true })
  courierName?: string

  @Column({
    type: 'varchar',
    length: 30,
    default: 'order_placed'
  })
  currentStatus!: TrackingStatus

  @Column({ nullable: true })
  estimatedDelivery?: Date

  @Column({ nullable: true })
  trackingUrl?: string

  @Column({ type: 'json', nullable: true })
  statusHistory?: string[]

  @UpdateDateColumn()
  updatedAt!: Date

  @CreateDateColumn()
  createdAt!: Date

  // Relationships
  @OneToOne('Order', (order: Order) => order.tracking)
  @JoinColumn()
  order!: Order
}
