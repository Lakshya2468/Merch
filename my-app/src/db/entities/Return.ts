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
import type { Order } from './Order'
import type { User } from './User'
import type { WalletTransaction } from './WalletTransaction'

export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'completed'
export type RefundStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type RefundMethod = 'original' | 'wallet' | 'bank_transfer'

@Entity({ name: 'returns' })
export class Return {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  orderId!: string

  @Column()
  userId!: string

  @Column()
  returnReason!: string

  @Column({ type: 'text', nullable: true })
  returnDescription?: string

  @Column({ type: 'json', nullable: true })
  returnImages?: string[]

  @Column({
    type: 'varchar',
    length: 20,
    default: 'requested'
  })
  returnStatus!: ReturnStatus

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true
  })
  refundAmount?: number

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  refundMethod?: RefundMethod

  @Column({
    type: 'varchar',
    length: 20,
    default: 'pending'
  })
  refundStatus!: RefundStatus

  @Column()
  requestedAt!: Date

  @Column({ nullable: true })
  approvedAt?: Date

  @Column({ nullable: true })
  refundedAt?: Date

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @OneToOne('Order', (order: Order) => order.return)
  @JoinColumn()
  order!: Order

  @ManyToOne('User', (user: User) => user.returns)
  @JoinColumn()
  user!: User

  @OneToOne(
    'WalletTransaction',
    (transaction: WalletTransaction) => transaction.return
  )
  walletTransaction?: WalletTransaction
}
