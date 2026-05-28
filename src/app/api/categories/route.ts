import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/categories - List all categories with product counts
export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { products: { where: { status: "APPROVED" } } },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
