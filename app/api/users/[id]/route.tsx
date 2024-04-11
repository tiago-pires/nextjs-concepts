import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: { id: number };
}

// Read record `curl http://localhost:3000/api/users/2`
export async function GET(request, { params: { id } }: Props) {
  // get users from source (DB etc)
  const res = await fetch(`http://localhost:3000/api/users/`);
  const users = await res.json();

  // get single user (remember: url id is a string)
  const user = users.find((user) => user.id === parseInt(id));

  // handle non existing user
  if (!user)
    return NextResponse.json(
      { error: `User ${id} not found` },
      { status: 404 },
    );
  // return user
  return NextResponse.json(user);
}

// Update
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  return NextResponse("put");
}

// Delete
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  return NextResponse("delete");
}
