import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

export const verifyToken = (token: string): CustomJwtPayload | null => {
    return jwtDecode(token);
}