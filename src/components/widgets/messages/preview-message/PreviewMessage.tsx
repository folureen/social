import { Box, Typography } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { PRIVATE_ROUTES } from 'common/constants/routes';
import { TPreviewMessage } from 'hooks/useDatabase/types';
import useDatabase from 'hooks/useDatabase/useDatabase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    previewMessage: TPreviewMessage;
};

const PreviewMessage: React.FC<Props> = ({ previewMessage }) => {
    const {
        getUserById,
        data: { user },
    } = useDatabase();
    const navigate = useNavigate();

    const handleRouteToChat = () => {
        navigate(`${PRIVATE_ROUTES.MESSAGES}/${previewMessage.sender}`);
    };

    useEffect(() => {
        getUserById(previewMessage.sender);
    }, [getUserById, previewMessage.sender]);

    return (
        <Box
            sx={{
                width: '100%',
                border: COLORS.gallery,
                borderRadius: 1,
                padding: 3,
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: COLORS.white,
            }}
            onClick={handleRouteToChat}>
            <Typography>{previewMessage.previewMessage}</Typography>
            <Typography>{user?.displayName}</Typography>
        </Box>
    );
};

export default PreviewMessage;
