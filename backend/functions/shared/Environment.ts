/**
 * Helper function to get environment variables conforming to string type.
 * @param key environment variable name
 * @returns environment variable value
 */
export function extractStringEnvVar(key: string): string {
    let result = process.env[key];
    if(result === undefined) {
        throw new Error(`Environment variable ${key} cannot be undefined`);
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
        throw new Error(`Environment variable ${key} cannot be undefined`);
    }
    return result;
}
