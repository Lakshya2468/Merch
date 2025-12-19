import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Order } from './Order'

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'order_id', unique: true })
  orderId!: number

  @Column({ name: 'payment_method', type: 'varchar', length: 20 })
  paymentMethod!: PaymentMethod

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: PaymentStatus

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string

  @Column({ name: 'payment_details', type: 'json', nullable: true })
  paymentDetails?: string

  @Column({ name: 'payment_date', nullable: true })
  paymentDate?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @OneToOne(() => Order, order => order.payment)
  @JoinColumn({ name: 'order_id' })
  order!: Order
}
