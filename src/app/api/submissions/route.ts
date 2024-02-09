
import { NextResponse } from "next/server"
import { limiter } from "../config/limiter";

interface ExecutionRequest {
    code: string;
    language: string;
}

export enum ExecutionStatus {
  NOT_STARTED = "NOT_STARTED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export type ExecutionOutput = {
  status: ExecutionStatus;
  std_out: string | null;
  std_err: string | null;
}

export type SubmissionResponse = {
  submission_id: String;
  status: ExecutionStatus;
  time: number | null;
  error: string | null;
  executions: ExecutionOutput[] | null;
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

        const response = await fetch(`${process.env.CODEGEET_URL}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.ACCESS_TOKEN ?? '',
            },
            body: JSON.stringify({ code: code, language: language, sync: true })
        })

        return NextResponse.json(await response.json() as SubmissionResponse)
    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }
}