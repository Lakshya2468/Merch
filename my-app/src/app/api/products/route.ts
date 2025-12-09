import {  NextResponse } from "next/server";
import { getDataSource } from "@/db/get-data-source";
import { Product } from "@/db/entities/Product";

// ✅ GET /api/products → fetch all products
export async function GET() {
  try {
    const ds = await getDataSource();        // ✅ initializes TypeORM & syncs
    const repo = ds.getRepository(Product);

    const products = await repo.find({
      order: { id: "DESC" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
