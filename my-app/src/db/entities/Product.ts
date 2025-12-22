import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Cart } from './Cart'
import type { Order } from './Order'
import type { ProductCategory } from './ProductCategory'
import type { ProductDesign } from './ProductDesign'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  sku!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number

  @Column({ nullable: true })
  thumbnailUrl?: string

  @Column({ type: 'json', nullable: true })
  availableColors?: string[]

  @Column({ type: 'json', nullable: true })
  availableSizes?: string[]

  @Column({ default: true })
  isCustomizable!: boolean

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @OneToMany(
    'ProductCategory',
    (productCategory: ProductCategory) => productCategory.product
  )
  productCategories!: ProductCategory[]

  @OneToMany(
    'ProductDesign',
    (productDesign: ProductDesign) => productDesign.product
  )
  productDesigns!: ProductDesign[]

  @OneToMany('Order', (order: Order) => order.product)
  orders!: Order[]

  @OneToMany('Cart', (cart: Cart) => cart.product)
  carts!: Cart[]
}
