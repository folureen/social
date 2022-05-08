import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from 'hooks/useAuth/useAuth';
import { COLORS, NETWORK_STATE } from 'common/constants/global';
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from 'common/constants/routes';
import { loginSchema } from './schema';
import type { TLoginData } from './types';
import { useState } from 'react';
import { FIREBASE_ERROR, FIREBASE_ERROR_NAME } from 'common/constants/errors';

const Login: React.FC = () => {
    const [notifyOpen, setNotifyOpen] = useState(false);

    const {
        loginUser,
        loaders: { isLoadingLoginUser },
        errors: { logInError },
    } = useAuth(setNotifyOpen);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: TLoginData) => {
        loginUser({ ...data });
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
                    Авторизация
                </Typography>
                <Typography
                    variant='subtitle1'
                    gutterBottom
                    component='div'
                    sx={{ textAlign: 'center', marginBottom: 5 }}>
                    Еще не зарегистрированы?{' '}
                    <Link to={PUBLIC_ROUTES.REGISTRATION}>Зарегистрироваться</Link>
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                                disabled={isLoadingLoginUser === NETWORK_STATE.PENDING}
                                fullWidth
                                variant='contained'
                                size='large'
                                type='submit'>
                                Войти
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
                    {logInError
                        ? FIREBASE_ERROR_NAME[logInError as keyof typeof FIREBASE_ERROR_NAME]
                        : FIREBASE_ERROR_NAME[FIREBASE_ERROR.INTERNAL_ERROR]}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;
