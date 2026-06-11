import moment from "moment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const res = await fetch(`https://api.frankfurter.dev/v2/currencies`);
    
    if (!res.ok) {
        return Response.json({error: "Failed to fetch currency"}, {status: res.status});
    };

    const data = await res.json();

    return Response.json({
        currency: data
    });
};