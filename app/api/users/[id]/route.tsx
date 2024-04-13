import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

interface Props {
  params: { id: string };
}

// Read record `curl http://localhost:3000/api/users/2`
export async function GET(request: NextRequest, { params: { id } }: Props) {
  // get single user (remember: url id is a string)
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  }); // returns `null` if not found

  // handle non existing user
  if (!user)
    return NextResponse.json(
      { error: `User ${id} not found` },
      { status: 404 },
    );
  // return user
  return NextResponse.json(user);
}

// Update a user `curl -X PUT  http://localhost:3000/api/users/1 -H "Content-Type: application/json" -d '{"name":"Marcela"}'`
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) {
    return NextResponse.json({ error: `User not found` }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

// Delete a user `curl -X DELETE  http://localhost:3000/api/users/1`
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // Get user (from DB)
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    return NextResponse.json({ error: `User not found` }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });

  // return deleted user
  return NextResponse.json(deletedUser);
}
