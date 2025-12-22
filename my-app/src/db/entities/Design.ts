import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Cart } from './Cart'
import type { Designer } from './Designer'
import type { DesignReview } from './DesignReview'
import type { Order } from './Order'
import type { ProductDesign } from './ProductDesign'

export type DesignType =
  | 'vector'
  | 'raster'
  | 'illustration'
  | 'typography'
  | 'photo'

@Entity({ name: 'designs' })
export class Design {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  designerId!: string

  @Column({ nullable: true })
  designCategoryId?: string

  @Column()
  title!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column()
  designFileUrl!: string

  @Column({ nullable: true })
  thumbnailUrl?: string

  @Column({ type: 'varchar', length: 50 })
  designType!: DesignType

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number

  @Column({ default: 0 })
  downloads!: number

  @Column({ default: true })
  isPublic!: boolean

  @Column({ default: false })
  isFeatured!: boolean

  @Column({ type: 'json', nullable: true })
  tags?: string[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  // Relationships
  @ManyToOne('Designer', (designer: Designer) => designer.designs)
  @JoinColumn()
  designer!: Designer

  @OneToMany(
    'ProductDesign',
    (productDesign: ProductDesign) => productDesign.design
  )
  productDesigns!: ProductDesign[]

  @OneToMany('DesignReview', (review: DesignReview) => review.design)
  reviews!: DesignReview[]

  @OneToMany('Order', (order: Order) => order.design)
  orders!: Order[]

  @OneToMany('Cart', (cart: Cart) => cart.design)
  carts!: Cart[]
}
