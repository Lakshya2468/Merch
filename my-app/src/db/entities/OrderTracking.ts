import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Order } from './Order'

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
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'order_id', unique: true })
  orderId!: number

  @Column({ name: 'tracking_number', nullable: true })
  trackingNumber?: string

  @Column({ name: 'courier_name', nullable: true })
  courierName?: string

  @Column({
    name: 'current_status',
    type: 'varchar',
    length: 30,
    default: 'order_placed'
  })
  currentStatus!: TrackingStatus

  @Column({ name: 'estimated_delivery', nullable: true })
  estimatedDelivery?: Date

  @Column({ name: 'tracking_url', nullable: true })
  trackingUrl?: string

  @Column({ name: 'status_history', type: 'json', nullable: true })
  statusHistory?: string[]

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @OneToOne(() => Order, order => order.tracking)
  @JoinColumn({ name: 'order_id' })
  order!: Order
}
