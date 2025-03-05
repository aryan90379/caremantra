import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      console.error("No file found in the request.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileExtension = path.extname(file.name);
    const fileName = `${Date.now()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), "tmp/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    console.log("File uploaded successfully to:", filePath);
    const fullUrl = `${request.nextUrl.origin}/api/images?file=${fileName}`;

    return NextResponse.json({ filePath: fullUrl });

  } catch (error) {
    console.error("Upload failed with error:", error.message, error.stack);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
