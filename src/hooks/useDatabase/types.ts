export type TUser = {
    createdAt: string;
    email: string;
    id: string;
    displayName: string;
    photoURL: string;
}

export type TMessage = {
    senderId: string;
    displayName: string;
    timestamp: number;
    message: string;
}

export type TPreviewMessage = {
    sender: string;
    previewMessage: string;
    messages: TMessage[]
}