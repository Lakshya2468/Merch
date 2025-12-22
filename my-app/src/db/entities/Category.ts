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
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: true })
  parentId?: string

  @Column()
  name!: string

  @Column({ unique: true })
  slug!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ nullable: true })
  iconUrl?: string

  @Column({ default: 0 })
  sortOrder!: number

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  // Self-referencing relationship
  @ManyToOne(() => Category, category => category.children, { nullable: true })
  @JoinColumn()
  parent?: Category

  @OneToMany(() => Category, category => category.parent)
  children!: Category[]

  @OneToMany(() => ProductCategory, productCategory => productCategory.category)
  productCategories!: ProductCategory[]
}
