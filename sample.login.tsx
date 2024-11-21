// import { Form, Input, Button, Row, Col, Checkbox, Typography } from 'antd';
// import 'antd/dist/reset.css';
// import banner from "../assets/images/banner.avif";
// import loginLogo from "../assets/images/login-banner.jpg";

// const { Link } = Typography;

// const Login = () => {
//     return (
//         <div style={{
//             height: '100vh',
//             backgroundImage: `url(${banner})`,
//             backgroundSize: 'cover',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//             <Row
//                 gutter={[16, 16]}  // Add gutter for spacing between columns on all screen sizes
//                 style={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                     padding: '40px',
//                     borderRadius: '8px',
//                     maxWidth: '800px',
//                     width: '100%'
//                 }}
//             >
//                 {/* Left Column */}
//                 <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <div>
//                         <img src={`${loginLogo}`} alt="Logo" style={{ maxWidth: '100%', borderRadius: '8px' }} />
//                     </div>
//                 </Col>

//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                     <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>PH University LogIn</h2>
//                     <Form>
//                         <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
//                             <Input placeholder="Username" style={{ borderRadius: '8px', marginBottom: '5px' }} />
//                         </Form.Item>
//                         <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
//                             <Input.Password placeholder="Password" style={{ borderRadius: '8px', marginBottom: '3px' }} />
//                         </Form.Item>

//                         <Row gutter={16} style={{ marginBottom: '20px' }}>
//                             <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                                 <Form.Item name="remember" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
//                                     <Checkbox>Remember me</Checkbox>
//                                 </Form.Item>
//                             </Col>
//                             <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                 <Link href="#" style={{ fontSize: '14px' }}>
//                                     Forgot Password?
//                                 </Link>
//                             </Col>
//                         </Row>

//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px', fontSize: "16px", fontWeight: "bold" }}>
//                                 Log in
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Login;



/*
Final Login Code 100% working
*/
// import { useForm, Controller, FieldValues } from 'react-hook-form';
// import { Input, Button, Row, Col, Checkbox, Typography, Form } from 'antd';
// import 'antd/dist/reset.css';
// import banner from "../assets/images/banner.avif";
// import loginLogo from "../assets/images/login-banner.jpg";
// import { useLoginMutation } from '../redux/features/auth/authApi';
// import { useAppDispatch } from '../redux/hooks';
// import { setUser, TUser } from '../redux/features/auth/authSlice';
// import { verifyToken } from '../utils/verifyToken';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// const { Link } = Typography;

// const Login = () => {
//     const { control, handleSubmit, formState: { errors } } = useForm({
//         defaultValues: {
//             id: "A-0001",
//             password: "admin123"
//         }
//     });
//     const [login] = useLoginMutation();
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const onSubmit = async (data: FieldValues) => {
//         const toastId = toast.loading('Loading..');

//         try {
//             const res = await login(data).unwrap();
//             const user = verifyToken(res.data.accessToken) as TUser;
//             dispatch(setUser({ user: user, token: res.data.accessToken }));
//             toast.success("Successfully logged in.", { id: toastId, duration: 2000 });
//             navigate(`/${user.role}/dashboard`);
//         } catch (err) {
//             toast.error("Login Failed", { id: toastId, duration: 2000 });
//         }
//     };

//     return (
//         <div style={{
//             height: '100vh',
//             backgroundImage: `url(${banner})`,
//             backgroundSize: 'cover',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//             <Row
//                 gutter={[16, 16]}
//                 style={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                     padding: '40px',
//                     borderRadius: '8px',
//                     maxWidth: '800px',
//                     width: '100%'
//                 }}
//             >
//                 {/* Left Column */}
//                 <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <div>
//                         <img src={loginLogo} alt="Logo" style={{ maxWidth: '100%', borderRadius: '8px' }} />
//                     </div>
//                 </Col>

//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                     <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', fontFamily: "revert" }}>PH University LogIn</h2>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div style={{ marginBottom: '15px' }}>
//                             <Controller
//                                 name="id"
//                                 control={control}
//                                 rules={{ required: 'Please input your ID!' }}
//                                 render={({ field }) => (
//                                     <Input
//                                         {...field}
//                                         placeholder="User ID"
//                                         style={{ borderRadius: '8px', marginBottom: "8px" }}
//                                     />
//                                 )}
//                             />
//                             {errors.id && <span style={{ color: 'red', fontSize: '12px' }}>{errors.id.message as string}</span>}
//                         </div>

//                         <div style={{ marginBottom: '15px' }}>
//                             <Controller
//                                 name="password"
//                                 control={control}
//                                 rules={{ required: 'Please input your Password!' }}
//                                 render={({ field }) => (
//                                     <Input.Password
//                                         {...field}
//                                         placeholder="Password"
//                                         style={{ borderRadius: '8px' }}
//                                     />
//                                 )}
//                             />
//                             {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message as string}</span>}
//                         </div>

//                         <Row gutter={16} style={{ marginBottom: '20px' }}>
//                             <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                                 <Form.Item name="remember" valuePropName="checked" initialValue={true} style={{ marginBottom: 0 }}>
//                                     <Checkbox>Remember me</Checkbox>
//                                 </Form.Item>
//                             </Col>
//                             <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                 <Link href="#" style={{ fontSize: '14px' }}>
//                                     Forgot Password?
//                                 </Link>
//                             </Col>
//                         </Row>

//                         <div>
//                             <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px', fontSize: "16px", fontWeight: "bold" }}>
//                                 Log in
//                             </Button>
//                         </div>
//                     </form>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Login;
