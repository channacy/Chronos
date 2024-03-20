import { NextResponse } from "next/server";
import { NextApiRequest } from 'next';

import prisma from "@/lib/prisma"

export async function DELETE(request: NextApiRequest, {params}){
    const id = params.id;
    console.log({id})

    const post = await prisma.task.delete({
        where:{id}
    })

    return NextResponse.json(request)
}