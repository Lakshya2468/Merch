import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'
import { WalletTransaction } from './WalletTransaction'

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id', unique: true })
  userId!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance!: number

  @Column({
    name: 'pending_balance',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  pendingBalance!: number

  @Column({ default: 'USD' })
  currency!: string

  @Column({ name: 'last_transaction_at', nullable: true })
  lastTransactionAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @OneToOne(() => User, user => user.wallet)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(() => WalletTransaction, transaction => transaction.wallet)
  transactions!: WalletTransaction[]
}
