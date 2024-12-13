import { FieldValues } from 'react-hook-form';
import { Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import banner from "../assets/images/banner.avif";
import changePasswordImg from "../assets/images/chang-password.jpg";
import { useChangePasswordMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../schemas/authManagement.schema';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Change Password...');

        try {
            const res = await changePassword(data).unwrap();
            if (res?.success) {
                toast.success(res.message, { id: toastId, duration: 2000 });
                dispatch(logOut());
                return navigate('/login');
            }
        } catch (err: any) {
            toast.error(err.data.message, { id: toastId, duration: 2000 });
        }
    }

    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Row
                gutter={[16, 16]}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '800px',
                    width: '100%',
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src={changePasswordImg}
                        alt="Logo"
                        style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                            marginBottom: '30px',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        User Change Password
                    </h2>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(changePasswordSchema)}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="oldPassword"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Old Password"
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="password"
                                name="newPassword"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter New Password"
                            />
                        </div>
                        <div>
                            <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px', fontSize: "16px", fontWeight: "bold" }}>
                                Change Password
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default ChangePassword;