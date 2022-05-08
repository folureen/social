export const PUBLIC_ROUTES = {
    REGISTRATION: '/registration',
    LOGIN: '/login',
} as const;

export const PRIVATE_ROUTES = {
    ME: '/me',
    USERS: '/users',
    USERS_PROFILE: '/users/:id',
    MESSAGES: '/messages',
} as const;