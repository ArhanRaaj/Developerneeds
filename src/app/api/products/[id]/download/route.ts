import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// POST /api/products/[id]/download - Track download and redirect
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Please login to download" }, { status: 401 });
    }

    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id, status: "APPROVED" },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Track download
    await db.download.create({
      data: {
        productId: id,
        userId: session.user.id,
      },
    });

    // Increment download count
    await db.product.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });

    return NextResponse.json({ downloadLink: product.downloadLink });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
