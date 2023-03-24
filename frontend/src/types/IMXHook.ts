import { Authentication, IMXClient } from "./IMX";

export type IMXHandler = [client: IMXClient, auth: Authentication, loading: boolean, error: string];