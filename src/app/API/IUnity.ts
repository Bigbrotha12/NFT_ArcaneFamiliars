
export interface IUnity {
    // Sender
    sendMessage(): void,
    // Receiver
    receiveMessage(message: string): void
}