import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Design } from './Design'
import type { Order } from './Order'
import type { User } from './User'

@Entity({ name: 'design_reviews' })
export class DesignReview {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  designId!: string

  @Column({ nullable: true })
  orderId?: string

  @Column({ type: 'int' })
  rating!: number

  @Column({ type: 'text', nullable: true })
  reviewText?: string

  @Column({ default: false })
  isVerifiedPurchase!: boolean

  @Column({ default: 0 })
  helpfulCount!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @ManyToOne('User', (user: User) => user.reviews)
  @JoinColumn()
  user!: User

  @ManyToOne('Design', (design: Design) => design.reviews)
  @JoinColumn()
  design!: Design

  @ManyToOne('Order', (order: Order) => order.designReviews, { nullable: true })
  @JoinColumn()
  order?: Order
}
