import { NextResponse, NextRequest } from "next/server";

// Source users form DB, hardcoded here  (localstorage wont work, this happens on the server!)
const users = [
  { id: 1, name: "Tiago" },
  { id: 2, name: "Bruno" },
  { id: 3, name: "Lucas" },
];

// Read users `curl http://localhost:3000/api/users`
export function GET(request: NextRequest) {
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
  return NextResponse.json(
    { id: users.length + 1, name: body.name },
    { status: 201 },
  );
}
