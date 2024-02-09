export interface ExecutionRequest {
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