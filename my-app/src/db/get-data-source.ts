import { DataSource } from 'typeorm'
import { AppDataSource } from './data-source'

let dataSource: DataSource | null = null

export async function getDataSource() {
  if (dataSource && dataSource.isInitialized) {
    return dataSource
  }

  if (!dataSource) {
    dataSource = AppDataSource
  }

  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize()
      console.log('✅ Database connected successfully')
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw error
    }
  }

  return dataSource
}

// Optional: Cleanup function for graceful shutdown
export async function closeDataSource() {
  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy()
    dataSource = null
  }
}
