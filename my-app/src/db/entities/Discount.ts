import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { DiscountUsage } from './DiscountUsage'

export type DiscountType = 'percentage' | 'fixed'

@Entity({ name: 'discounts' })
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  code!: string

  @Column()
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'varchar', length: 20 })
  discountType!: DiscountType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountValue!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
  })
  minOrderAmount!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true
  })
  maxDiscount?: number

  @Column({ nullable: true })
  usageLimit?: number

  @Column({ default: 0 })
  usedCount!: number

  @Column({ default: false })
  isAutoApply!: boolean

  @Column({ type: 'json', nullable: true })
  applicableProducts?: number[]

  @Column({ type: 'json', nullable: true })
  applicableCategories?: number[]

  @Column()
  validFrom!: Date

  @Column()
  validUntil!: Date

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @OneToMany('DiscountUsage', (usage: DiscountUsage) => usage.discount)
  usages!: DiscountUsage[]
}
