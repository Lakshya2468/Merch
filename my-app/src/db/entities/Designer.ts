import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Design } from './Design'
import { User } from './User'

@Entity({ name: 'designers' })
export class Designer {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'display_name' })
  displayName!: string

  @Column({ type: 'text', nullable: true })
  bio?: string

  @Column({ name: 'portfolio_url', nullable: true })
  portfolioUrl?: string

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2 })
  commissionRate!: number

  @Column({ name: 'total_designs', default: 0 })
  totalDesigns!: number

  @Column({
    name: 'total_earnings',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  totalEarnings!: number

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating?: number

  @Column({ name: 'review_count', default: 0 })
  reviewCount!: number

  @Column({ name: 'is_approved', default: false })
  isApproved!: boolean

  @Column({ name: 'verified_at', nullable: true })
  verifiedAt?: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @OneToOne(() => User, user => user.designer)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @OneToMany(() => Design, design => design.designer)
  designs!: Design[]
}
