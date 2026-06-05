import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || "image.jpg";

    if (!request.body) {
      return NextResponse.json({ error: "No image payload provided" }, { status: 400 });
    }

    // Streams the binary body payload directly to Vercel Blob
    const blob = await put(`uploads/${Date.now()}-${filename}`, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image to cloud storage" }, { status: 500 });
  }
}
