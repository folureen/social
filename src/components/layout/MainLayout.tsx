import { Box } from '@mui/material';
import Header from 'components/ui/header';
import Sidebar from 'components/ui/sidebar';
import { ReactNode } from 'react';

type Props = {
    main: ReactNode;
};

const MainLayout: React.FC<Props> = ({ main }) => {
    return (
        <>
            <Box>
                <Header />
            </Box>

            <Box
                sx={{
                    maxWidth: '60%',
                    margin: 'auto',
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Box
                    sx={{
                        left: 0,
                        width: 250,
                    }}>
                    <Sidebar />
                </Box>
                <Box sx={{ ml: 2, mt: 2, width: '100%' }}>{main}</Box>
            </Box>
        </>
    );
};

export default MainLayout;
