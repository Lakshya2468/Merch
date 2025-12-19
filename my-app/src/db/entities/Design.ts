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
import { Cart } from './Cart'
import { Designer } from './Designer'
import { DesignReview } from './DesignReview'
import { Order } from './Order'
import { ProductDesign } from './ProductDesign'

export type DesignType =
  | 'vector'
  | 'raster'
  | 'illustration'
  | 'typography'
  | 'photo'

@Entity({ name: 'designs' })
export class Design {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'designer_id' })
  designerId!: number

  @Column({ name: 'design_category_id', nullable: true })
  designCategoryId?: number

  @Column()
  title!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'design_file_url' })
  designFileUrl!: string

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl?: string

  @Column({ name: 'design_type', type: 'varchar', length: 50 })
  designType!: DesignType

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number

  @Column({ default: 0 })
  downloads!: number

  @Column({ name: 'is_public', default: true })
  isPublic!: boolean

  @Column({ name: 'is_featured', default: false })
  isFeatured!: boolean

  @Column({ type: 'json', nullable: true })
  tags?: string[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => Designer, designer => designer.designs)
  @JoinColumn({ name: 'designer_id' })
  designer!: Designer

  @OneToMany(() => ProductDesign, productDesign => productDesign.design)
  productDesigns!: ProductDesign[]

  @OneToMany(() => DesignReview, review => review.design)
  reviews!: DesignReview[]

  @OneToMany(() => Order, order => order.design)
  orders!: Order[]

  @OneToMany(() => Cart, cart => cart.design)
  carts!: Cart[]
}
