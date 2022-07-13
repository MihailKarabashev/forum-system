import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext"

const RouteGuard = () => {
    const { user } = useAuthContext();
    const isAuth = user.token ? true : false;

    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default RouteGuard