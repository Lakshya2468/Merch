import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Design } from './Design'
import { Order } from './Order'
import { User } from './User'

@Entity({ name: 'design_reviews' })
export class DesignReview {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'design_id' })
  designId!: number

  @Column({ name: 'order_id', nullable: true })
  orderId?: number

  @Column({ type: 'int' })
  rating!: number

  @Column({ name: 'review_text', type: 'text', nullable: true })
  reviewText?: string

  @Column({ name: 'is_verified_purchase', default: false })
  isVerifiedPurchase!: boolean

  @Column({ name: 'helpful_count', default: 0 })
  helpfulCount!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Design, design => design.reviews)
  @JoinColumn({ name: 'design_id' })
  design!: Design

  @ManyToOne(() => Order, order => order.designReviews, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order
}
