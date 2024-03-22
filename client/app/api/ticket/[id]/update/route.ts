import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function PUT(request: NextApiRequest, { params }): Promise<Response> {
  console.log("PUT DATA called")
  const id = params.id;
  const res = await request.json()
  const { title, summary, status, priority, comments} = res;
  await prisma.task.update({
    where: { id },
    data: {
      title,
      summary,
      status,
      priority,
      comments
    },
  });

  return NextResponse.json({ success: true });
}
