import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: { id: number };
}

// Source users form DB, hardcoded here  (localstorage wont work, this happens on the server!)
function getUserById(id) {
  const users = [
    { id: "1", name: "Tiago" },
    { id: "2", name: "Bruno" },
    { id: "3", name: "Lucas" },
  ];
  const user = users.find((user) => user.id === id);

  if (!user) return false;

  return user;
}

// Read record `curl http://localhost:3000/api/users/2`
export async function GET(request, { params: { id } }: Props) {
  // get single user (remember: url id is a string)
  const user = getUserById(id);

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

  if (!body.name) {
    return NextResponse.json({ error: `Name is required` }, { status: 400 });
  }

  const user = getUserById(id);

  if (!user) {
    return NextResponse.json(
      { error: `User ${id} not found` },
      { status: 404 },
    );
  }

  return NextResponse.json({ id, name: body.name });
}

// Delete a user `curl -X DELETE  http://localhost:3000/api/users/1`
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // Get user (from DB)
  const user = getUserById(id);

  // If user not found

  if (!user) {
    return NextResponse.json(
      { error: `User ${id} not found` },
      { status: 404 },
    );
  }
  // return deleted user
  return NextResponse.json(user);
}
