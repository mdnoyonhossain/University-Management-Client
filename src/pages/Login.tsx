import { FieldValues } from 'react-hook-form';
import { Button, Row, Col, Checkbox, Typography, Form } from 'antd';
import 'antd/dist/reset.css';
import banner from "../assets/images/banner.avif";
import loginLogo from "../assets/images/login-banner.jpg";
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authManagement.schema';

const { Link } = Typography;

const Login = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Login...');

        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            toast.success(res.message, { id: toastId, duration: 2000 });
            navigate(`/${user.role}/dashboard`);
        } catch (err: any) {
            toast.error(err.data.message, { id: toastId, duration: 2000 });
        }
    }

    return (
        <div style={{
            height: '100vh',
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Row
                gutter={[16, 16]}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '40px',
                    borderRadius: '8px',
                    maxWidth: '800px',
                    width: '100%'
                }}
            >
                <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img src={loginLogo} alt="Logo" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    </div>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                            marginBottom: '20px',
                            fontFamily: 'Arial, sans-serif',
                        }}>
                        PH University Login
                    </h2>

                    <PHForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="id"
                                style={{ borderRadius: '8px' }}
                                placeholder="User ID"
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="password"
                                name="password"
                                style={{ borderRadius: '8px' }}
                                placeholder="Password"
                            />
                        </div>

                        <Row gutter={16} style={{ marginBottom: '20px' }}>
                            <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Form.Item name="remember" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link href="#" style={{ fontSize: '14px' }}>
                                    Forgot Password?
                                </Link>
                            </Col>
                        </Row>

                        <div>
                            <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px', fontSize: "16px", fontWeight: "bold" }}>
                                Login
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
