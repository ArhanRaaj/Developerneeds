import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { roleUpdateSchema } from "@/lib/validators";
import { canAssignRoles } from "@/lib/utils";

// PUT /api/users/[id]/role - Update user role (FOUNDER only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role;
    if (!canAssignRoles(userRole)) {
      return NextResponse.json(
        { error: "Only FOUNDERS can assign roles" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = roleUpdateSchema.safeParse({ ...body, userId: id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    // Cannot change own role
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Cannot change your own role" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updated = await db.user.update({
      where: { id },
      data: { role: parsed.data.role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
