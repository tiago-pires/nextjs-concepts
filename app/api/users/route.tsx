import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

// Read users `curl http://localhost:3000/api/users`
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

// Create user `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"Marcela", "email": "m@mo.co"}'`
export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate request body
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name or Email is required" },
      { status: 400 },
    );
  }

  // check user with this email does not yet exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser)
    return NextResponse.json(
      { error: "User already exisits" },
      { status: 400 },
    );

  // create user in DB (with new id)
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // response
  return NextResponse.json(newUser, { status: 201 });
}
