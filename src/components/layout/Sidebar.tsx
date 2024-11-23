import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import logo from "../../assets/images/logo.png";
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';

const { Sider } = Layout;

const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student"
}

const Sidebar = () => {
    const user = useAppSelector(selectCurrentUser)
    let sidebarItems;

    switch (user!.role) {
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
            // onBreakpoint={(broken) => console.log(broken)}
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
                <img style={{
                    height: '64px',
                    margin: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '18px',
                }} src={logo} alt="logo" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['Dashboard']} items={sidebarItems} />
        </Sider>
    );
};

export default Sidebar;