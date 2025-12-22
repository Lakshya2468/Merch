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
import type { User } from './User'
import type { WalletTransaction } from './WalletTransaction'

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  userId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  pendingBalance!: number

  @Column({ default: 'USD' })
  currency!: string

  @Column({ nullable: true })
  lastTransactionAt?: Date

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @OneToOne('User', (user: User) => user.wallet)
  @JoinColumn()
  user!: User

  @OneToMany(
    'WalletTransaction',
    (transaction: WalletTransaction) => transaction.wallet
  )
  transactions!: WalletTransaction[]
}
