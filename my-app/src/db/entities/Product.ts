import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Cart } from './Cart'
import { Order } from './Order'
import { ProductCategory } from './ProductCategory'
import { ProductDesign } from './ProductDesign'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ unique: true })
  sku!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl?: string

  @Column({ name: 'available_colors', type: 'json', nullable: true })
  availableColors?: string[]

  @Column({ name: 'available_sizes', type: 'json', nullable: true })
  availableSizes?: string[]

  @Column({ name: 'is_customizable', default: true })
  isCustomizable!: boolean

  @Column({ name: 'is_active', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @OneToMany(() => ProductCategory, productCategory => productCategory.product)
  productCategories!: ProductCategory[]

  @OneToMany(() => ProductDesign, productDesign => productDesign.product)
  productDesigns!: ProductDesign[]

  @OneToMany(() => Order, order => order.product)
  orders!: Order[]

  @OneToMany(() => Cart, cart => cart.product)
  carts!: Cart[]
}
