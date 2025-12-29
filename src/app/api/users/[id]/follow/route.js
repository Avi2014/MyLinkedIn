import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { followerUid } = body;

    if (!followerUid) {
      return NextResponse.json(
        { message: "Follower UID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/users/${id}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerUid }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { message: "Failed to follow user" },
      { status: 500 }
    );
  }
}
