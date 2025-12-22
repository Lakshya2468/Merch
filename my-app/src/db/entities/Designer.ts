import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import type { Design } from './Design'
import type { User } from './User'

@Entity({ name: 'designers' })
export class Designer {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  displayName!: string

  @Column({ type: 'text', nullable: true })
  bio?: string

  @Column({ nullable: true })
  portfolioUrl?: string

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  commissionRate!: number

  @Column({ default: 0 })
  totalDesigns!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  totalEarnings!: number

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating?: number

  @Column({ default: 0 })
  reviewCount!: number

  @Column({ default: false })
  isApproved!: boolean

  @Column({ nullable: true })
  verifiedAt?: Date

  @CreateDateColumn()
  createdAt!: Date

  // Relationships
  @OneToOne('User', (user: User) => user.designer)
  @JoinColumn()
  user!: User

  @OneToMany('Design', (design: Design) => design.designer)
  designs!: Design[]
}
