'use server'

import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { getBestChampionData } from '@/app/lib/champion';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);

        const name = url.searchParams.get('champion');

        if (!name) return NextResponse.redirect(process.env.BASE_URL);

        const bestPerformers = await getBestChampionData(name);

        return NextResponse.json(bestPerformers);
    } catch (err) {
        return NextResponse.redirect(process.env.BASE_URL);
    }
}