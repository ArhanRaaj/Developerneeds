import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
import { canManageProducts } from "@/lib/utils";

// GET /api/products - List products with filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "12");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") ?? "newest";
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") ?? "APPROVED";

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    const orderBy: Record<string, string> = {};
    switch (sort) {
      case "oldest":
        orderBy.createdAt = "asc";
        break;
      case "popular":
        orderBy.downloadCount = "desc";
        break;
      case "views":
        orderBy.views = "desc";
        break;
      default:
        orderBy.createdAt = "desc";
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
          author: {
            select: { id: true, username: true, avatar: true, role: true },
          },
          images: true,
          _count: { select: { downloads: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/products - Create product
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canManageProducts((session.user as { role: string }).role)) {
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

    const product = await db.product.create({
      data: {
        title,
        description,
        downloadLink,
        credits: credits ?? null,
        categoryId,
        authorId: session.user.id,
        status: "APPROVED", // Auto-approve for now; add moderation later
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

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
