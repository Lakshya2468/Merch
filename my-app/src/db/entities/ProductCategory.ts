import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Category } from './Category'
import { Product } from './Product'

@Entity({ name: 'product_categories' })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'product_id' })
  productId!: number

  @Column({ name: 'category_id' })
  categoryId!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Relationships
  @ManyToOne(() => Product, product => product.productCategories)
  @JoinColumn({ name: 'product_id' })
  product!: Product

  @ManyToOne(() => Category, category => category.productCategories)
  @JoinColumn({ name: 'category_id' })
  category!: Category
}
