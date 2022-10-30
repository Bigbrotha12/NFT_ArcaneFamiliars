import { IUnity } from "./IUnity";

export class Unity implements IUnity {
    sendMessage(): void {
        throw new Error("Method not implemented.");
    }
    receiveMessage(message: string): void {
        throw new Error(message);
    }
    
}