export const COLORS = {
    gallery: '#edeef0',
    white: '#ffffff',
    black: '#000000'
} as const;

export enum NETWORK_STATE {
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED'
}