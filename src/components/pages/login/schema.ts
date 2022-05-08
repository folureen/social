import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required('Обязательное поле').email('Некорректный формат').trim(),
    password: yup.string().required('Обязательное поле'),
}).required();