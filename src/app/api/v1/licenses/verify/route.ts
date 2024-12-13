import { NextResponse } from "next/server";
import { verifyLicense } from "@/lib/license";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { licenseKey, productId } = await request.json();

    const license = await prisma.license.findUnique({
      where: { key: licenseKey },
    });

    if (!license) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    const isValid = await verifyLicense(license, productId);

    return NextResponse.json({
      isValid,
      expiresAt: license.expiresAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
