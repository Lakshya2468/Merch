import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ProductCategory } from './ProductCategory'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'parent_id', nullable: true })
  parentId?: number

  @Column()
  name!: string

  @Column({ unique: true })
  slug!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'icon_url', nullable: true })
  iconUrl?: string

  @Column({ name: 'sort_order', default: 0 })
  sortOrder!: number

  @Column({ name: 'is_active', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  // Self-referencing relationship
  @ManyToOne(() => Category, category => category.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Category

  @OneToMany(() => Category, category => category.parent)
  children!: Category[]

  @OneToMany(() => ProductCategory, productCategory => productCategory.category)
  productCategories!: ProductCategory[]
}
