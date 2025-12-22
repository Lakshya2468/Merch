import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import type { Category } from './Category'
import type { Product } from './Product'

@Entity({ name: 'product_categories' })
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  productId!: string

  @Column()
  categoryId!: string

  @CreateDateColumn()
  createdAt!: Date

  // Relationships
  @ManyToOne('Product', (product: Product) => product.productCategories)
  @JoinColumn()
  product!: Product

  @ManyToOne('Category', (category: Category) => category.productCategories)
  @JoinColumn()
  category!: Category
}
