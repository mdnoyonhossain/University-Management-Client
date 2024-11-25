import { Button, Row, Col, Steps } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../assets/images/banner.avif";
import registerStudentImg from "../../../assets/images/create-student.jpg";
import PHForm from '../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from '../../../schemas/academicManagement.schema';
import { FieldValues } from 'react-hook-form';
import PHInput from '../../../components/form/PHInput';
import { useState } from 'react';

const { Step } = Steps;

const CreateStudent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputFieldData, setInputFieldData] = useState({}); // Store form data here

    const onNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = async (data: FieldValues) => {
        const updatedStudentData = { ...inputFieldData, ...data };
        setInputFieldData(updatedStudentData);

        const formData = new FormData();
        formData.append("data", JSON.stringify(updatedStudentData));

        if (currentStep === steps.length - 1) {
            console.log('Final data:', updatedStudentData);
            console.log(Object.fromEntries(formData));
        } else {
            onNext();
        }
    };

    const steps = [
        {
            title: 'Basic Info',
            content: (
                <PHForm onSubmit={onSubmit} >
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="name"
                            style={{ borderRadius: '8px' }}
                            placeholder="Academic Faculty Name"
                        />
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            borderRadius: '8px',
                            fontSize: '16px',
                        }}
                    >
                        Next
                    </Button>
                </PHForm>
            ),
        },
        {
            title: 'Additional Info',
            content: (
                <PHForm onSubmit={onSubmit} /**resolver={zodResolver(academicFacultySchema)} */>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="email"
                            name="email"
                            style={{ borderRadius: '8px' }}
                            placeholder="Student Email"
                        />
                    </div>
                    <div>
                        <Button
                            type="default"
                            onClick={onPrevious}
                            style={{
                                borderRadius: '8px',
                                marginRight: '10px',
                                fontSize: '16px',
                            }}
                        >
                            Previous
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                borderRadius: '8px',
                                fontSize: '16px',
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </PHForm>
            ),
        },
    ];

    return (
        <div
            style={{
                minHeight: '80vh',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'contain',
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
                        src={registerStudentImg}
                        alt="Logo"
                        style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                            marginBottom: '30px',
                            fontFamily: 'Arial, sans-serif',
                        }}>
                        Register PH Student
                    </h2>

                    <Steps current={currentStep} size="small" style={{ marginBottom: '30px' }}>
                        {steps.map((step, index) => (
                            <Step key={index} title={step.title} />
                        ))}
                    </Steps>

                    {steps[currentStep].content}
                </Col>
            </Row>
        </div>
    );
};

export default CreateStudent;
