import * as entities from '@/db/entities'
import { getDataSource } from '@/db/get-data-source'
import { NextResponse } from 'next/server'
import { EntityTarget, LessThan, ObjectLiteral } from 'typeorm'

// ✅ GET /api/alldata?entity=Product&limit=20
// Cursor-based pagination for infinite scroll
// Next page: /api/alldata?entity=Product&limit=20&cursor=2024-12-01T10:30:00.000Z
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const entityName = searchParams.get('entity')
    const limit = parseInt(searchParams.get('limit') || '20')
    const cursor = searchParams.get('cursor')

    if (!entityName) {
      return NextResponse.json(
        { message: 'Entity name is required. Example: ?entity=Product' },
        { status: 400 }
      )
    }

    const EntityClass = (entities as { [key: string]: unknown })[entityName]

    if (!EntityClass) {
      return NextResponse.json(
        {
          message: `Entity "${entityName}" not found`,
          availableEntities: Object.keys(entities)
        },
        { status: 404 }
      )
    }
    // TypeORM: Get DataSource and Repository
    const ds = await getDataSource()
    const repo = ds.getRepository(EntityClass as EntityTarget<ObjectLiteral>)

    // TypeORM: Find with cursor-based pagination
    const results = await repo.find({
      where: cursor ? { createdAt: LessThan(new Date(cursor)) } : {},
      order: { createdAt: 'DESC' },
      take: limit + 1
    })

    const hasMore = results.length > limit
    const data = hasMore ? results.slice(0, limit) : results
    const nextCursor = data.length > 0 ? data[data.length - 1].createdAt : null

    return NextResponse.json({
      data,
      hasMore,
      nextCursor
    })
  } catch (error) {
    console.error('❌ GET /api/alldata error:', error)
    return NextResponse.json(
      {
        message: 'Failed to fetch data',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
