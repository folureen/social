import MainLayout from 'components/layout';
import Login from 'components/pages/login';
import Messages from 'components/pages/messages';
import Profile from 'components/pages/profile';
import Users from 'components/pages/users';
import Chat from 'components/widgets/messages/chat';
import useAuth from 'hooks/useAuth/useAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../common/constants/routes';
import Registration from '../components/pages/registration';

const MainRoutes = () => {
    const {
        auth: { isAuth },
    } = useAuth();

    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route path={PRIVATE_ROUTES.ME} element={<MainLayout main={<Profile />} />} />
                    <Route
                        path={PRIVATE_ROUTES.USERS_PROFILE}
                        element={<MainLayout main={<Profile />} />}>
                        <Route path=':userId' element={<MainLayout main={<Profile />} />} />
                    </Route>
                    <Route path={PRIVATE_ROUTES.USERS} element={<MainLayout main={<Users />} />} />
                    <Route
                        path={PRIVATE_ROUTES.MESSAGES}
                        element={<MainLayout main={<Messages />} />}
                    />
                    <Route path={PRIVATE_ROUTES.MESSAGES} element={<MainLayout main={<Chat />} />}>
                        <Route path=':userId' element={<MainLayout main={<Chat />} />} />
                    </Route>
                    <Route path='*' element={<Navigate to={PRIVATE_ROUTES.ME} replace />} />
                </>
            ) : (
                <>
                    <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
                    <Route path={PUBLIC_ROUTES.REGISTRATION} element={<Registration />} />
                    <Route path='*' element={<Navigate to={PUBLIC_ROUTES.LOGIN} replace />} />
                </>
            )}
        </Routes>
    );
};

export default MainRoutes;
