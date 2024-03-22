import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: NextApiRequest){
    const res = await request.json()
    const {title, summary, status, priority} = res;
    console.log({res})

    const result = await prisma.task.create({
        data: {
            title,
            summary,
            status,
            priority,
            published:true,
            author: {create:{
                name: 'Channacy'
            }}
        }
    })

    return NextResponse.json({result})
}