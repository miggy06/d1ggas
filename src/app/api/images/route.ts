import { list, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();
    // Filter to only uploads directory, and sort by upload date descending (newest first)
    const uploads = blobs
      .filter((blob) => blob.pathname.startsWith("uploads/"))
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ success: true, blobs: uploads });
  } catch (error: any) {
    console.error("Vercel Blob list error:", error);
    return NextResponse.json({ error: error.message || "Failed to list images from cloud storage" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No image URL provided for deletion" }, { status: 400 });
    }

    // del() accepts the full URL directly
    await del(url);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Vercel Blob delete error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete image from cloud storage" }, { status: 500 });
  }
}
