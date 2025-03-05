import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json({ error: "No file specified" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "tmp/uploads", fileName);

  try {
    const file = fs.readFileSync(filePath);
    return new NextResponse(file, { headers: { "Content-Type": "image/*" } });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
