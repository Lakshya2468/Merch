import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

export type ProductType = 'tshirt' | 'hoodie' | 'cap'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column('int')
  basePrice!: number

  @Column({
    type: 'varchar',
    length: 20
  })
  type!: ProductType

  @CreateDateColumn()
  createdAt!: Date
}
