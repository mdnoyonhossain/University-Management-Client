import { Layout, Menu, Button, Input, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logOut } from '../../redux/features/auth/authSlice';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const MainLayout = () => {
    const [search, setSearch] = useState('');
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logOut());
    }
    
    console.log(search);

    const profileMenu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                Settings
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Sidebar />
            <Layout>
                <Header
                    style={{
                        padding: '0 24px',
                        backgroundImage: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', flex: '1' }}>
                        PH University Management System
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1', justifyContent: 'flex-end' }}>
                        <Search
                            placeholder="Search..."
                            onSearch={(value) => setSearch(value)}
                            style={{ width: '200px' }}
                        />

                        <Dropdown overlay={profileMenu} trigger={['click']}>
                            <Button type="text" style={{ color: '#fff', backgroundColor: 'transparent' }}>
                                <UserOutlined /> My Profile
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0', padding: '0 24px' }}>
                    <div
                        style={{
                            padding: '24px',
                            minHeight: '360px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#2e7d32',
                        color: '#fff',
                        padding: '16px 50px',
                        fontSize: '14px',
                    }}
                >
                    PH University Management System ©{new Date().getFullYear()} Developed by Noyon Hossain
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
