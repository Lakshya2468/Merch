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
import { Product } from './Product'
import { User } from './User'

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'product_id' })
  productId!: number

  @Column({ name: 'design_id', nullable: true })
  designId?: number

  @Column({ name: 'custom_design_url', nullable: true })
  customDesignUrl?: string

  @Column({ name: 'selected_color', nullable: true })
  selectedColor?: string

  @Column({ name: 'selected_size', nullable: true })
  selectedSize?: string

  @Column({ type: 'int', default: 1 })
  quantity!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => User, user => user.carts)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Product, product => product.carts)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @ManyToOne(() => Design, design => design.carts, { nullable: true })
  @JoinColumn({ name: 'design_id' })
  design?: Design
}
