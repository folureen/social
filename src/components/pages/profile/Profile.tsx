import { Box } from '@mui/material';
import Avatar from 'components/widgets/profile/avatar';
import Information from 'components/widgets/profile/information';
import { getAuth, User } from 'firebase/auth';
import type { TUser } from 'hooks/useDatabase/types';
import useDatabase from 'hooks/useDatabase/useDatabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
    let params = useParams();
    const {
        getUserById,
        data: { user },
    } = useDatabase();

    const [profile, setProfile] = useState<TUser | User | null>(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useEffect(() => {
        if (params.id) {
            getUserById(params.id);
        }
    }, [getUserById, params.id]);

    useEffect(() => {
        if (params.id && user !== null) {
            setProfile(user);
            setIsCurrentUser(false);
            return;
        }
        const auth = getAuth();
        setProfile(auth.currentUser);
        setIsCurrentUser(true);
    }, [params.id, user]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar isCurrentUser={isCurrentUser} profilePicture={profile?.photoURL as string} />
            <Information isCurrentUser={isCurrentUser} profile={profile} />
        </Box>
    );
};

export default Profile;
