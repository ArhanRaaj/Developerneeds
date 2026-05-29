import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
import { canModerate } from "@/lib/utils";

// GET /api/products/[id] - Get single product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: { id: true, username: true, avatar: true, role: true },
        },
        images: true,
        _count: { select: { downloads: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Increment views
    await db.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const product = await db.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userRole = (session.user as { role: string }).role;
    // Only author or moderators can edit
    if (product.authorId !== session.user.id && !canModerate(userRole)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, description, downloadLink, credits, categoryId, images } = parsed.data;

    // Delete old images and create new ones
    if (images) {
      await db.productImage.deleteMany({ where: { productId: id } });
    }

    const updated = await db.product.update({
      where: { id },
      data: {
        title,
        description,
        downloadLink,
        credits: credits ?? null,
        categoryId,
        images: images?.length
          ? { create: images.map((url) => ({ url })) }
          : undefined,
      },
      include: {
        category: true,
        author: {
          select: { id: true, username: true, avatar: true, role: true },
        },
        images: true,
      },
    });

    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error("Product PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const product = await db.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userRole = (session.user as { role: string }).role;
    if (product.authorId !== session.user.id && !canModerate(userRole)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    await db.product.delete({ where: { id } });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
