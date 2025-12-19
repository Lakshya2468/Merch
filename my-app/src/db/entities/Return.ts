import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Order } from './Order'
import { User } from './User'
import { WalletTransaction } from './WalletTransaction'

export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'completed'
export type RefundStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type RefundMethod = 'original' | 'wallet' | 'bank_transfer'

@Entity({ name: 'returns' })
export class Return {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'order_id', unique: true })
  orderId!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'return_reason' })
  returnReason!: string

  @Column({ name: 'return_description', type: 'text', nullable: true })
  returnDescription?: string

  @Column({ name: 'return_images', type: 'json', nullable: true })
  returnImages?: string[]

  @Column({
    name: 'return_status',
    type: 'varchar',
    length: 20,
    default: 'requested'
  })
  returnStatus!: ReturnStatus

  @Column({
    name: 'refund_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true
  })
  refundAmount?: number

  @Column({
    name: 'refund_method',
    type: 'varchar',
    length: 20,
    nullable: true
  })
  refundMethod?: RefundMethod

  @Column({
    name: 'refund_status',
    type: 'varchar',
    length: 20,
    default: 'pending'
  })
  refundStatus!: RefundStatus

  @Column({ name: 'requested_at' })
  requestedAt!: Date

  @Column({ name: 'approved_at', nullable: true })
  approvedAt?: Date

  @Column({ name: 'refunded_at', nullable: true })
  refundedAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @OneToOne(() => Order, order => order.return)
  @JoinColumn({ name: 'order_id' })
  order!: Order

  @ManyToOne(() => User, user => user.returns)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToOne(() => WalletTransaction, transaction => transaction.return)
  walletTransaction?: WalletTransaction
}
