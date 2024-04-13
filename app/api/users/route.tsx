import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

// Read users `curl http://localhost:3000/api/users`
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

// Create user `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"Marcela"}'`
export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate request body
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  // create user in DB (with new id)

  // response
  return NextResponse.json({ todo: "will create user next" }, { status: 201 });
}
