import { Product } from '@/db/entities'
import { getDataSource } from '@/db/get-data-source'
import { NextResponse } from 'next/server'

// ✅ GET /api/products → fetch all products
export async function GET() {
  try {
    const ds = await getDataSource() // ✅ initializes TypeORM & syncs
    const repo = ds.getRepository(Product)
    const products = await repo.find({
      order: { createdAt: 'DESC' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ GET /api/products error:', error)
    return NextResponse.json(
      {
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
