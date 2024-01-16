
import { NextResponse } from "next/server"
import { limiter } from "../config/limiter";

interface ExecutionRequest {
    code: string;
    language: string;
}

interface Execution {
    execution_id: string;
    language: string;
    code: string;
    std_out?: string;
    std_err?: string;
    error?: string;
    exit_code?: number;
    created_at: Date;
    executed_at?: Date;
    total_execution_millis?: number;
}

export interface ExecutionResponse {
    execution_id: string;
    execution?: Execution;
}

export async function POST(req: Request) {
    const origin = req.headers.get('origin')
    const remaining = await limiter.removeTokens(1)

    if (remaining < 0) {
        return new NextResponse(null, {
            status: 429,
            statusText: "Too Many Requests",
            headers: {
                'Acces-Control-llow-Origing': origin || '*',
                'Content-Type': 'text/plain'
            }
        })
    }

    try {

        const { code, language }: ExecutionRequest = await req.json()

        const response = await fetch(`${process.env.CODEGEET_URL}/execution`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.ACCESS_TOKEN ?? '',
            },
            body: JSON.stringify({ code: code, language: language, sync: true })
        })

        return NextResponse.json(await response.json() as ExecutionResponse)
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}