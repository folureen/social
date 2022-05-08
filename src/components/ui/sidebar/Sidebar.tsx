import { MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { PRIVATE_ROUTES } from 'common/constants/routes';
import { BiMessageSquare } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const MenuItemStyles = {
    borderRadius: 2,
    mb: 1,
};

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleRoute = (value: string) => {
        navigate(PRIVATE_ROUTES[value as keyof typeof PRIVATE_ROUTES], { replace: true });
    };

    return (
        <MenuList>
            <MenuItem sx={{ ...MenuItemStyles }} onClick={() => handleRoute('ME')}>
                <ListItemIcon>
                    <CgProfile />
                </ListItemIcon>
                <ListItemText>Моя страница</ListItemText>
            </MenuItem>
            <MenuItem sx={{ ...MenuItemStyles }} onClick={() => handleRoute('MESSAGES')}>
                <ListItemIcon>
                    <BiMessageSquare />
                </ListItemIcon>
                <ListItemText>Сообщения</ListItemText>
            </MenuItem>
            <MenuItem sx={{ ...MenuItemStyles }} onClick={() => handleRoute('FRIENDS')}>
                <ListItemIcon>
                    <MdOutlinePeopleAlt />
                </ListItemIcon>
                <ListItemText>Друзья</ListItemText>
            </MenuItem>
            <MenuItem sx={{ ...MenuItemStyles }} onClick={() => handleRoute('USERS')}>
                <ListItemIcon>
                    <MdOutlinePeopleAlt />
                </ListItemIcon>
                <ListItemText>Список пользователей</ListItemText>
            </MenuItem>
        </MenuList>
    );
};

export default Sidebar;
