import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import type { Design } from './Design'
import type { Product } from './Product'

@Entity({ name: 'product_designs' })
export class ProductDesign {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  productId!: string

  @Column()
  designId!: string

  @CreateDateColumn()
  createdAt!: Date

  // Relationships
  @ManyToOne('Product', (product: Product) => product.productDesigns)
  @JoinColumn()
  product!: Product

  @ManyToOne('Design', (design: Design) => design.productDesigns)
  @JoinColumn()
  design!: Design
}
