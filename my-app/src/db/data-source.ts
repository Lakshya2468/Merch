// TypeORM DataSource configuration
// src/db/data-source.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product'

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error('❌ DATABASE_URL is not set in .env.local')
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: true, // ✅ AUTO creates tables (DEV only)
  logging: false,
  entities: [Product] // ✅ Add all your entities here later
})
