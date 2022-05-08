import { Box, Button, TextField } from '@mui/material';
import { COLORS } from 'common/constants/global';
import { getAuth } from 'firebase/auth';
import useDatabase from 'hooks/useDatabase/useDatabase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Message from '../message';

const Chat: React.FC = () => {
    const { sendMessage } = useDatabase();
    const [message, setMessage] = useState('');
    const params = useParams();

    const auth = getAuth();

    const handleWriteMessage = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(params.userId as string, message);
    };

    const {
        getMessagesById,
        data: { messages },
    } = useDatabase();

    useEffect(() => {
        getMessagesById(params.userId as string);
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: COLORS.white,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '60vh',
                    overflow: 'auto',
                }}>
                {messages.map((message) => {
                    return (
                        <Message
                            key={message.message + message.senderId + message.timestamp}
                            isMe={message.senderId === auth.currentUser?.uid}
                            message={message}
                        />
                    );
                })}
            </Box>
            <Box sx={{ bottom: 0, width: '100%' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={handleWriteMessage}
                />
                <Button onClick={handleSendMessage}>Отправить</Button>
            </Box>
        </Box>
    );
};

export default Chat;
