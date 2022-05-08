import { Avatar, Box, Typography } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { TMessage } from 'hooks/useDatabase/types';

type Props = {
    isMe: boolean;
    message: TMessage;
};

const Message: React.FC<Props> = ({ isMe, message }) => {
    if (isMe) {
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    padding: 1,
                }}>
                <Box sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            mr: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}>
                        <Typography>{message.displayName}</Typography>
                        <Typography variant='subtitle2'>
                            {new Date(message.timestamp).toLocaleTimeString('ru')}
                        </Typography>
                    </Box>
                    <Avatar alt={message.displayName} />
                </Box>
                <Typography
                    sx={{
                        padding: 1,
                        border: 2,
                        mr: 7,
                        borderColor: COLORS.gallery,
                        borderRadius: 3,
                        borderTopRightRadius: 0,
                        maxWidth: 325,
                        height: 'auto',
                    }}>
                    {message.message}
                </Typography>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: 1,
            }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar alt={message.displayName} />
                <Box
                    sx={{
                        ml: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}>
                    <Typography>{message.displayName}</Typography>
                    <Typography variant='subtitle2'>
                        {new Date(message.timestamp).toLocaleTimeString('ru')}
                    </Typography>
                </Box>
            </Box>
            <Typography
                sx={{
                    padding: 1,
                    border: 2,
                    ml: 7,
                    borderColor: COLORS.gallery,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                    maxWidth: 325,
                    height: 'auto',
                }}>
                {message.message}
            </Typography>
        </Box>
    );
};

export default Message;
