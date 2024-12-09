import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentToken, TUser } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
}

const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    let user;
    
    if (token) {
        user = verifyToken(token);
    }

    if (role !== undefined && role !== (user as TUser)?.role) {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />
    }

    if (!token) {
        return <Navigate to="/login" replace={true} />
    }

    return children
};

export default ProtectedRoutes;