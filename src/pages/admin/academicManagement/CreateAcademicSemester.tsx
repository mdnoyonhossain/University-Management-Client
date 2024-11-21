import { Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../assets/images/banner.avif";
import createSemester from "../../../assets/images/create-semester.jpg";
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHSelect from '../../../components/form/PHSelect';

const CreateAcademicSemester = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    const semesterNameOptions = [
        { value: "Autumn", label: "Autumn" },
        { value: "Summer", label: "Summer" },
        { value: "Fall", label: "Fall" },
    ];

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Row
                gutter={[16, 16]}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '900px',
                    width: '100%',
                }}
            >
                {/* Left Column: Image */}
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src={createSemester}
                        alt="Logo"
                        style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '24px',
                            marginBottom: '20px',
                            fontFamily: 'revert',
                        }}
                    >
                        PH University Log In
                    </h2>
                    <PHForm onSubmit={onSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="id"
                                style={{ borderRadius: '8px', marginBottom: '8px' }}
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
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="name" options={semesterNameOptions} style={{ width: '100%' }} placeholder="Select Semester Name" />
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                }}
                            >
                                Register Semester
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateAcademicSemester;
