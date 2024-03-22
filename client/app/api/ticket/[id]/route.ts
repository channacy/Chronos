import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(request: NextApiRequest, { params }): Promise<Response> {
  const id = params.id;
  console.log({ id });

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function GET(request, { params }) {
  const id = params.id;
  console.log(id)
  console.log("GET called");
  const result = await prisma.task.findUnique({
    where: { id },
  });
  return NextResponse.json(result);
}

export async function PUT(request: NextApiRequest, { params }): Promise<Response> {
  const id = params.id;
  console.log("id:", { id });

  await prisma.task.update({
    where: { id },
    data: {
      published : false,
    },
  });

  return NextResponse.json({ success: true });
}

