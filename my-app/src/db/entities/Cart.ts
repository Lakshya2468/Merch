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
import type { Product } from './Product'
import type { User } from './User'

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  productId!: string

  @Column({ nullable: true })
  designId?: string

  @Column({ nullable: true })
  customDesignUrl?: string

  @Column({ nullable: true })
  selectedColor?: string

  @Column({ nullable: true })
  selectedSize?: string

  @Column({ type: 'int', default: 1 })
  quantity!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @ManyToOne('User', (user: User) => user.carts)
  @JoinColumn()
  user!: User

  @ManyToOne('Product', (product: Product) => product.carts)
  @JoinColumn()
  product!: Product

  @ManyToOne('Design', (design: Design) => design.carts, { nullable: true })
  @JoinColumn()
  design?: Design
}
