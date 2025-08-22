import { NextResponse } from 'next/server';
import { getSession } from '@/app/_lib/session';
import { getUserName } from '@/app/_lib/MOCKDB';
import {redirect} from 'next/navigation';

export async function GET(request:Request){
    const session = await getSession();
    console.log("SESSION FROM GET:", session);
    if (!session){
         return NextResponse.redirect(new URL("/login", request.url));
    }
    try{
        const username = await getUserName(session.sub);
        console.log("Username fetched: ", username)
        return NextResponse.json({username});
    } catch (error) {
        return NextResponse.json({error: "Failed to get user from session token"}, {status: 500})
    }
}
