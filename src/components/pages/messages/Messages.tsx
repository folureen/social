import { Box } from '@mui/material';
import PreviewMessage from 'components/widgets/messages/preview-message';
import useDatabase from 'hooks/useDatabase/useDatabase';
import { useEffect } from 'react';

const Messages: React.FC = () => {
    const {
        getPreviewMessages,
        data: { previewMessages },
    } = useDatabase();

    useEffect(() => {
        getPreviewMessages();
    }, []);

    return (
        <Box>
            {previewMessages.map((previewMessage) => {
                return (
                    <PreviewMessage key={previewMessage.sender} previewMessage={previewMessage} />
                );
            })}
        </Box>
    );
};

export default Messages;
