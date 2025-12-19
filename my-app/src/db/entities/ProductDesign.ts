import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Design } from './Design'
import { Product } from './Product'

@Entity({ name: 'product_designs' })
export class ProductDesign {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'product_id' })
  productId!: number

  @Column({ name: 'design_id' })
  designId!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @ManyToOne(() => Product, product => product.productDesigns)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @ManyToOne(() => Design, design => design.productDesigns)
  @JoinColumn({ name: 'design_id' })
  design!: Design
}
