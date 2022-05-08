import * as yup from "yup";

const passwordLength = 6;
const nameLength = 2;

export const registrationSchema = yup.object({
    firstName: yup.string().required('Обязательное поле').trim().min(nameLength, `Имя должно состоять минимум из ${nameLength} символов`),
    lastName: yup.string().required('Обязательное поле').trim().min(nameLength, `Фамилия должна состоять минимум из ${nameLength} символов`),
    email: yup.string().required('Обязательное поле').email('Некорректный формат').trim(),
    password: yup.string().required('Обязательное поле').min(passwordLength, `Пароль должен состоять минимум из ${passwordLength} символов`),
}).required();