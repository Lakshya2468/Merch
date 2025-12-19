import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Order } from './Order'
import { Return } from './Return'
import { Wallet } from './Wallet'

export type TransactionType =
  | 'credit'
  | 'debit'
  | 'refund'
  | 'commission'
  | 'withdrawal'
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

@Entity({ name: 'wallet_transactions' })
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'wallet_id' })
  walletId!: number

  @Column({ name: 'order_id', nullable: true })
  orderId?: number

  @Column({ name: 'return_id', nullable: true })
  returnId?: number

  @Column({ name: 'transaction_type', type: 'varchar', length: 20 })
  transactionType!: TransactionType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number

  @Column({ name: 'balance_after', type: 'decimal', precision: 10, scale: 2 })
  balanceAfter!: number

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: TransactionStatus

  @Column({ type: 'json', nullable: true })
  metadata?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @ManyToOne(() => Wallet, wallet => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet!: Wallet

  @ManyToOne(() => Order, order => order.walletTransactions, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order

  @ManyToOne(() => Return, return_ => return_.walletTransaction, {
    nullable: true
  })
  @JoinColumn({ name: 'return_id' })
  return?: Return
}
