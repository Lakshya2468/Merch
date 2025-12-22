import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import type { Order } from './Order'
import type { Return } from './Return'
import type { Wallet } from './Wallet'

export type TransactionType =
  | 'credit'
  | 'debit'
  | 'refund'
  | 'commission'
  | 'withdrawal'
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

@Entity({ name: 'wallet_transactions' })
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  walletId!: string

  @Column({ nullable: true })
  orderId?: string

  @Column({ nullable: true })
  returnId?: string

  @Column({ type: 'varchar', length: 20 })
  transactionType!: TransactionType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceAfter!: number

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: TransactionStatus

  @Column({ type: 'json', nullable: true })
  metadata?: string

  @CreateDateColumn()
  createdAt!: Date

  // Relationships
  @ManyToOne('Wallet', (wallet: Wallet) => wallet.transactions)
  @JoinColumn()
  wallet!: Wallet

  @ManyToOne('Order', (order: Order) => order.walletTransactions, {
    nullable: true
  })
  @JoinColumn()
  order?: Order

  @ManyToOne('Return', (return_: Return) => return_.walletTransaction, {
    nullable: true
  })
  @JoinColumn()
  return?: Return
}
