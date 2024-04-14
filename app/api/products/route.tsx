import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// `curl http://localhost:3000/api/products`
export async function GET(request: NextRequest) {
  const products = await prisma.products.findMany();
  if (!products) return NextResponse.json({ error: "No products found" }, {});
  return NextResponse.json(products);
}

// curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"Avocado", "price": 5}'
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.products.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(newProduct);
}
