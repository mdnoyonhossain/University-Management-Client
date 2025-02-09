import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import logo from "../../assets/images/logo.png";
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { selectCurrentToken, TUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { verifyToken } from '../../utils/verifyToken';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const userRole = {
    ADMIN: "admin",
    SUPERADMIN: "superAdmin",
    FACULTY: "faculty",
    STUDENT: "student"
}

const Sidebar = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }

    let sidebarItems;

    switch ((user as TUser)!.role) {
        case userRole.SUPERADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.SUPERADMIN)
            break;
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN)
            break;
        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY)
            break;
        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT)
            break;

        default:
            break;
    }

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                backgroundImage: 'linear-gradient(45deg, #001529, #004d99)',
                color: 'red',
                height: "100vh",
                position: "sticky",
                top: "0",
                left: "0"
            }}
        >
            <div>
                <Link to="/">
                    <img style={{
                        height: '30%',
                        marginBottom: '16px',
                        width: "100%",
                        background: 'rgba(255, 255, 255, 0.2)',
                        objectFit: "cover",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }} src={logo} alt="logo" />
                </Link>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']} items={sidebarItems as any} />
        </Sider>
    );
};

export default Sidebar;