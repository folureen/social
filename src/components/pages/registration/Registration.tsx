import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from './schema';
import type { TRegistrationData } from './types';
import useAuth from 'hooks/useAuth/useAuth';
import { COLORS, NETWORK_STATE } from 'common/constants/global';
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from 'common/constants/routes';
import { FIREBASE_ERROR_NAME, FIREBASE_ERROR } from 'common/constants/errors';
import { useState } from 'react';

const Registration: React.FC = () => {
    const [notifyOpen, setNotifyOpen] = useState(false);

    const {
        createUser,
        loaders: { isLoadingCreateUser },
        errors: { signInError },
    } = useAuth(setNotifyOpen);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(registrationSchema),
    });

    const onSubmit = (data: TRegistrationData) => {
        createUser({ ...data });
    };

    return (
        <>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: '25vh',
                    padding: 7,
                    border: 1,
                    borderRadius: 3,
                    borderColor: COLORS.gallery,
                }}>
                <Typography
                    variant='h4'
                    gutterBottom
                    component='div'
                    sx={{ textAlign: 'center', margin: 5 }}>
                    Регистрация
                </Typography>
                <Typography
                    variant='subtitle1'
                    gutterBottom
                    component='div'
                    sx={{ textAlign: 'center', margin: 5 }}>
                    Уже есть аккаунт? <Link to={PUBLIC_ROUTES.LOGIN}>Авторизоваться</Link>
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name='firstName'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={errors?.firstName !== undefined}
                                        helperText={errors?.firstName?.message}
                                        fullWidth
                                        label='Имя'
                                        variant='outlined'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='lastName'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={errors?.lastName !== undefined}
                                        helperText={errors?.lastName?.message}
                                        fullWidth
                                        label='Фамилия'
                                        variant='outlined'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={errors?.email !== undefined}
                                        helperText={errors?.email?.message}
                                        fullWidth
                                        label='Email'
                                        variant='outlined'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={errors?.password !== undefined}
                                        helperText={errors?.password?.message}
                                        fullWidth
                                        label='Пароль'
                                        variant='outlined'
                                        type='password'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={isLoadingCreateUser === NETWORK_STATE.PENDING}
                                fullWidth
                                variant='contained'
                                size='large'
                                type='submit'>
                                Создать аккаунт
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Snackbar
                open={notifyOpen}
                autoHideDuration={6000}
                onClose={() => setNotifyOpen(false)}>
                <Alert onClose={() => setNotifyOpen(false)} severity='error' sx={{ width: '100%' }}>
                    {signInError
                        ? FIREBASE_ERROR_NAME[signInError as keyof typeof FIREBASE_ERROR_NAME]
                        : FIREBASE_ERROR_NAME[FIREBASE_ERROR.INTERNAL_ERROR]}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Registration;
