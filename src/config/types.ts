export interface ExecutionRequest {
  code: string;
  language: string;
}

export enum ExecutionStatus {
  SUCCESS = "SUCCESS",
  COMPILATION_ERROR = "COMPILATION_ERROR",
  INVOCATION_ERROR = "INVOCATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  TIMEOUT = "TIMEOUT"
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