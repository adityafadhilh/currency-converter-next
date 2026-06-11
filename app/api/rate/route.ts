import moment from "moment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    // const res = await fetch(`https://api.frankfurter.dev/v2/rates?from=${moment(Date.now()).format('YYYY-MM-DD')}&base=IDR`);
    const searchParams = req.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const res = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}?from=${moment(Date.now()).format('YYYY-MM-DD')}`);
    
    if (!res.ok) {
        return Response.json({error: "Failed to fetch currency"}, {status: res.status});
    };

    const data = await res.json();

    return Response.json({
        currency: data
    });
};