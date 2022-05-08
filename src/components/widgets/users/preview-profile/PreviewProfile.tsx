import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { PRIVATE_ROUTES } from 'common/constants/routes';
import type { TUser } from 'hooks/useDatabase/types';
import { useNavigate } from 'react-router-dom';

type Props = {
    user: TUser;
};

const PreviewProfile: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    const handleWriteMessage = () => {
        navigate(`${PRIVATE_ROUTES.MESSAGES}/${user.id}`);
    };

    const handleRouteToProfile = () => {
        navigate(`${PRIVATE_ROUTES.USERS}/${user.id}`);
    };

    return (
        <Box
            sx={{
                backgroundColor: COLORS.white,
                padding: 3,
                border: 1,
                borderRadius: 2,
                borderColor: COLORS.gallery,
                mb: 1,
            }}>
            <Grid container spacing={3} alignItems='center'>
                <Grid item>
                    <Avatar
                        alt={user.displayName}
                        src={user.photoURL}
                        sx={{ width: 100, height: 100, cursor: 'pointer' }}
                        onClick={handleRouteToProfile}
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        component='div'
                        sx={{ cursor: 'pointer' }}
                        onClick={handleRouteToProfile}>
                        {user.displayName}
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button
                            variant='outlined'
                            size='small'
                            sx={{ borderColor: '#55677d', color: '#55677d' }}
                            onClick={handleWriteMessage}>
                            Написать сообщение
                        </Button>
                        <Button
                            variant='outlined'
                            size='small'
                            sx={{ borderColor: '#55677d', color: '#55677d' }}>
                            Добавить в друзья
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PreviewProfile;
