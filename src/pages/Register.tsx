import { Form, Input, Button, Row, Col, Checkbox, Typography } from 'antd';
import 'antd/dist/reset.css';
import banner from "../assets/images/banner.avif";
import loginLogo from "../assets/images/login-banner.jpg";

const { Link } = Typography;

const Register = () => {
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
                gutter={[16, 16]}  // Add gutter for spacing between columns on all screen sizes
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '40px',
                    borderRadius: '8px',
                    maxWidth: '800px',
                    width: '100%'
                }}
            >
                {/* Left Column */}
                <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img src={`${loginLogo}`} alt="Logo" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    </div>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>PH University Register</h2>
                    <Form>
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input placeholder="Username" style={{ borderRadius: '8px', marginBottom: '5px' }} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input.Password placeholder="Password" style={{ borderRadius: '8px', marginBottom: '3px' }} />
                        </Form.Item>

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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px', fontSize: "16px", fontWeight: "bold" }}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Register;