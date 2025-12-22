// TypeORM DataSource configuration
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as entities from './entities'

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error('❌ DATABASE_URL is not set in .env.local')
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: true, // ✅ AUTO creates tables (DEV only)
  logging: false,
  entities: Object.values(entities),
  subscribers: [],
  migrations: []
})
