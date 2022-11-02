import * as dotenv from 'dotenv';
dotenv.config();

export function extractStringEnvVar(key: string): string {
    let result = process.env[key];
    if(result === undefined) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}

export function extractNumberEnvVar(key: string): number {
    let result = Number(process.env[key]);

    // result === result checks for NaN
    if(result === undefined || !(result === result)) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}
