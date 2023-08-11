export type Message = {
    message: string;
    type: MessageType;
}

export enum MessageType {
    WARNING = 'warning',
    DANGER = 'danger',
    SUCCESS = 'success',
    INFO = 'info',
}
