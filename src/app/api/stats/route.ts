import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { canModerate } from "@/lib/utils";

// GET /api/stats - Dashboard statistics
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role;
    const isAdmin = canModerate(userRole);

    // Base stats everyone on dashboard can see
    const [totalProducts, totalDownloads] = await Promise.all([
      db.product.count({ where: { status: "APPROVED" } }),
      db.download.count(),
    ]);

    const recentProducts = await db.product.findMany({
      where: { status: "APPROVED" },
      include: {
        category: true,
        author: {
          select: { id: true, username: true, avatar: true, role: true },
        },
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Admin-only stats
    let totalUsers = 0;
    let totalViews = 0;
    if (isAdmin) {
      [totalUsers, totalViews] = await Promise.all([
        db.user.count(),
        db.product.aggregate({ _sum: { views: true } }).then((r) => r._sum.views ?? 0),
      ]);
    }

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalDownloads,
      totalViews,
      recentProducts,
    });
  } catch (error) {
    console.error("Stats GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
