import { AppBar, Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { COLORS } from 'common/constants/global';
import useAuth from 'hooks/useAuth/useAuth';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

const Header: React.FC = () => {
    const auth = getAuth();
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { logOut } = useAuth();
    const handleClickOnAvatar: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setAnchorEl(e.currentTarget);
        setIsOpenProfileMenu(true);
    };

    return (
        <AppBar
            position='static'
            sx={{
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: COLORS.white,
            }}>
            <Typography variant='h5' noWrap sx={{ ml: '21%', display: { color: COLORS.black } }}>
                Social
            </Typography>
            <IconButton id='Avatar' onClick={handleClickOnAvatar} sx={{ mr: '20%' }}>
                <Avatar
                    alt={auth.currentUser?.displayName as string}
                    src={auth.currentUser?.photoURL as string}
                />
                <IoMdArrowDropdown />
            </IconButton>
            <Menu
                id='Avatar'
                sx={{ mt: '36px' }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isOpenProfileMenu}
                onClose={() => setIsOpenProfileMenu(false)}>
                <MenuItem onClick={() => null}>
                    <Typography textAlign='center'>Настройки</Typography>
                </MenuItem>
                <MenuItem onClick={() => logOut()}>
                    <Typography textAlign='center'>Выйти</Typography>
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Header;
