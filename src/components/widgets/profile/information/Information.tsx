import { Box, Divider, Typography } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { User } from 'firebase/auth';
import { TUser } from 'hooks/useDatabase/types';

type Props = {
    profile: TUser | User | null;
    isCurrentUser: boolean;
};

const Information: React.FC<Props> = ({ profile, isCurrentUser }) => {
    return (
        <Box
            sx={{
                ml: 3,
                backgroundColor: COLORS.white,
                width: '100%',
                height: 300,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
            }}>
            <Typography variant='h6' sx={{ ml: 2, mt: 1 }}>
                {profile?.displayName}
            </Typography>
            <Divider />
        </Box>
    );
};

export default Information;
