import { Box } from '@mui/material';
import { NETWORK_STATE } from 'common/constants/global';
import Loader from 'components/widgets/loader';
import PreviewProfile from 'components/widgets/users/preview-profile';
import { getAuth } from 'firebase/auth';
import useDatabase from 'hooks/useDatabase/useDatabase';
import { useEffect } from 'react';

const Users: React.FC = () => {
    const auth = getAuth();

    const {
        getUsers,
        data: { users },
        loaders: { isLoading },
    } = useDatabase();

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading === NETWORK_STATE.PENDING) {
        return <Loader />;
    }

    return (
        <Box>
            {users.map((user) => {
                if (user.id === auth.currentUser?.uid) {
                    return null;
                }
                return <PreviewProfile key={user.id} user={user} />;
            })}
        </Box>
    );
};

export default Users;
