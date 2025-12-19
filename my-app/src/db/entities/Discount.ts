import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { DiscountUsage } from './DiscountUsage'

export type DiscountType = 'percentage' | 'fixed'

@Entity({ name: 'discounts' })
export class Discount {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  code!: string

  @Column()
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'discount_type', type: 'varchar', length: 20 })
  discountType!: DiscountType

  @Column({ name: 'discount_value', type: 'decimal', precision: 10, scale: 2 })
  discountValue!: number

  @Column({
    name: 'min_order_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  minOrderAmount!: number

  @Column({
    name: 'max_discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true
  })
  maxDiscount?: number

  @Column({ name: 'usage_limit', nullable: true })
  usageLimit?: number

  @Column({ name: 'used_count', default: 0 })
  usedCount!: number

  @Column({ name: 'is_auto_apply', default: false })
  isAutoApply!: boolean

  @Column({ name: 'applicable_products', type: 'json', nullable: true })
  applicableProducts?: number[]

  @Column({ name: 'applicable_categories', type: 'json', nullable: true })
  applicableCategories?: number[]

  @Column({ name: 'valid_from' })
  validFrom!: Date

  @Column({ name: 'valid_until' })
  validUntil!: Date

  @Column({ name: 'is_active', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @OneToMany(() => DiscountUsage, usage => usage.discount)
  usages!: DiscountUsage[]
}
