import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const response = await fetch(`${BACKEND_URL}/api/users/${id}/following`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching following:", error);
    return NextResponse.json(
      { message: "Failed to fetch following" },
      { status: 500 }
    );
  }
}
