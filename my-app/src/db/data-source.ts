// TypeORM DataSource configuration
// src/db/data-source.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Address } from './entities/Address'
import { Cart } from './entities/Cart'
import { Category } from './entities/Category'
import { Design } from './entities/Design'
import { Designer } from './entities/Designer'
import { DesignReview } from './entities/DesignReview'
import { Discount } from './entities/Discount'
import { DiscountUsage } from './entities/DiscountUsage'
import { Order } from './entities/Order'
import { OrderTracking } from './entities/OrderTracking'
import { Payment } from './entities/Payment'
import { Product } from './entities/Product'
import { ProductCategory } from './entities/ProductCategory'
import { ProductDesign } from './entities/ProductDesign'
import { Return } from './entities/Return'
import { User } from './entities/User'
import { Wallet } from './entities/Wallet'
import { WalletTransaction } from './entities/WalletTransaction'

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error('❌ DATABASE_URL is not set in .env.local')
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: true, // ✅ AUTO creates tables (DEV only)
  logging: false,
  entities: [
    User,
    Designer,
    Address,
    Wallet,
    WalletTransaction,
    Category,
    Product,
    ProductCategory,
    Design,
    ProductDesign,
    DesignReview,
    Order,
    Payment,
    Return,
    OrderTracking,
    Cart,
    Discount,
    DiscountUsage
  ]
})
