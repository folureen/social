import { Box, CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
