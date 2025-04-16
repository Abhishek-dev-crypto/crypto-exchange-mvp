import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { prisma } from '@/lib/prisma'; 
export async function POST(req: Request) {
  try {
    const { address, signature, message } = await req.json();

    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { walletAddress: address } });

    if (!user) {
      user = await prisma.user.create({ data: { walletAddress: address } });
    }

    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
