import { TRegistrationData } from "../registration/types";

export type TLoginData = Pick<TRegistrationData, 'email' | 'password'>