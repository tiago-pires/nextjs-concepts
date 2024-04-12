import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

const products = [
  {
    id: "1",
    name: "Milk",
    price: 1.5,
  },
  {
    id: "2",
    name: "Butter",
    price: 1,
  },
  {
    id: "3",
    name: "Honey",
    price: 2.5,
  },
];

export function GET(request: NextRequest) {
  return NextResponse.json(products);
}

// curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"Avocado", "price": 5}'
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json(
    {
      id: 4,
      name: body.name,
      price: body.price,
    },
    { status: 201 },
  );
}
