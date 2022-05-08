export const FIREBASE_ERROR = {
    USER_NOT_FOUND: 'auth/user-not-found',
    TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
    NETWORK_REQUEST_FAILED: "auth/network-request-failed",
    INVALID_PASSWORD: "auth/wrong-password",
    INVALID_EMAIL: "auth/invalid-email",
    INTERNAL_ERROR: "auth/internal-error",
    EMAIL_EXISTS: "auth/email-already-in-use",
} as const;


export const FIREBASE_ERROR_NAME = {
    [FIREBASE_ERROR.USER_NOT_FOUND]: 'Пользователь с таким email не найден',
    [FIREBASE_ERROR.TOO_MANY_ATTEMPTS_TRY_LATER]: "Слишком много попыток, попробуйте позже",
    [FIREBASE_ERROR.NETWORK_REQUEST_FAILED]: "Что-то пошло не так. Перезагрузите страницу или попробуйте позже",
    [FIREBASE_ERROR.INVALID_PASSWORD]: "Неверный пароль",
    [FIREBASE_ERROR.INVALID_EMAIL]: "Неверный email",
    [FIREBASE_ERROR.INTERNAL_ERROR]: "Что-то пошло не так. Перезагрузите страницу или попробуйте позже",
    [FIREBASE_ERROR.EMAIL_EXISTS]: "Email уже используется другим пользователем",
}