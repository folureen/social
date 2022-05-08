import { Box, Button, Avatar } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { useState } from 'react';
import ModalProfileImage from '../profile-image';

type Props = {
    profilePicture: string;
    isCurrentUser: boolean;
};

const ProfileAvatar: React.FC<Props> = ({ profilePicture, isCurrentUser }) => {
    const [changeImageOpen, setChangeImageOpen] = useState(false);
    const isHasPicture = Boolean(profilePicture);

    const handleOpenModal = () => setChangeImageOpen(true);
    const handleSendMessage = () => null;

    return (
        <>
            <Box
                sx={{
                    backgroundColor: COLORS.white,
                    width: 325,
                    height: 300,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                }}>
                <Avatar
                    variant='rounded'
                    alt='U'
                    src={isHasPicture ? (profilePicture as string) : undefined}
                    sx={{ mt: 1, width: '94%', height: 'auto', maxHeight: 200 }}
                />
                {isCurrentUser ? (
                    <Button
                        variant='contained'
                        sx={{ mt: 2, backgroundColor: '#55677d', width: 200, height: 35 }}
                        onClick={handleOpenModal}>
                        Редактировать
                    </Button>
                ) : (
                    <Button
                        variant='contained'
                        sx={{ mt: 2, backgroundColor: '#55677d' }}
                        onClick={handleSendMessage}>
                        Написать сообщение
                    </Button>
                )}
            </Box>
            <ModalProfileImage
                changeImageOpen={changeImageOpen}
                setChangeImageOpen={setChangeImageOpen}
            />
        </>
    );
};

export default ProfileAvatar;
