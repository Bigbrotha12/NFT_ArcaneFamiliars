import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Helper function to get environment variables conforming to string type.
 * @param key environment variable name
 * @returns environment variable value
 */
export function extractStringEnvVar(key: string): string {
    let result = process.env[key];
    if(result === undefined) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}

/**
 * Helper function to get environment variables conforming to number type.
 * @param key environment variable name
 * @returns environment variable value
 */
export function extractNumberEnvVar(key: string): number {
    let result = Number(process.env[key]);

    // result === result checks for NaN
    if(result === undefined || !(result === result)) {
        console.error(`Environment variable ${key} cannot be undefined`);
        process.exit(1);
    }
    return result;
}
