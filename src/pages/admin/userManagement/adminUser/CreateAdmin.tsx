import { Button, Row, Col, Steps, Form, Upload } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import registerAdminImg from "../../../../assets/images/admin.jpg";
import PHForm from '../../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues } from 'react-hook-form';
import PHInput from '../../../../components/form/PHInput';
import { useState } from 'react';
import PHSelect from '../../../../components/form/PHSelect';
import { bloodGroupOptions, genderOptions } from '../../../../constants/global';
import PHDatePicker from '../../../../components/form/PHDatePicker';
import { useCreateAdminMutation } from '../../../../redux/features/admin/userManagementApi';
import { UploadOutlined } from "@ant-design/icons";
import { toast } from 'sonner';
import { adminContactInfoSchema, adminInfoAdminSchema, personalInfoAdminSchema } from '../../../../schemas/userManagement.schema';

const { Step } = Steps;

const CreateAdmin = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputFieldData, setInputFieldData] = useState({}); // Store form data here
    const [addAdmin] = useCreateAdminMutation();

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
        const updatedAdminData = { ...inputFieldData, ...data, ...data.profileImg };
        setInputFieldData(updatedAdminData);

        const adminData = {
            password: "admin123",
            admin: updatedAdminData
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(adminData));
        formData.append("file", updatedAdminData.profileImg);

        if (currentStep === steps.length - 1) {
            const toastId = toast.loading("Register Admin...");

            try {
                const res = await addAdmin(formData);

                if ('error' in res) {
                    const errorMessage = (res.error as any)?.data?.message;
                    toast.error(errorMessage, { id: toastId });
                } else if ('data' in res) {
                    toast.success(res.data.message, { id: toastId });
                }
            } catch (err: any) {
                toast.error(err.message, { id: toastId });
            }
        } else {
            onNext();
        }
    };

    const steps = [
        {
            title: 'Admin Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(adminInfoAdminSchema)}>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="text"
                            name="name.firstName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="text"
                            name="name.middleName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Middle Name (Optional)"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="text"
                            name="name.lastName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="designation"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Admin Designation"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <Controller
                            name="profileImg"
                            render={({ field: { onChange, value, ...field } }) => (
                                <Form.Item>
                                    <Upload.Dragger
                                        {...field}
                                        beforeUpload={(file) => {
                                            onChange(file);
                                            return false;
                                        }}
                                        fileList={value ? [value] : []}
                                        onRemove={() => onChange(null)}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <UploadOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or Drag Upload Profile Image</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            )}
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
            title: 'Contact Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(adminContactInfoSchema)}>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="email"
                            name="email"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="number"
                            name="contactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="number"
                            name="emergencyContactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter emergency contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHInput
                            type="text"
                            name="presentAddress"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your present address"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="permanentAddress"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your permanent address"
                        />
                    </div>
                    <Row justify="start" gutter={10}>
                        <Col xs={24} sm={12} md={11}>
                            <Button
                                type="default"
                                block
                                onClick={onPrevious}
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    backgroundColor: '#FF5733',
                                    color: '#fff',
                                }}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} md={11}>
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
                        </Col>
                    </Row>
                </PHForm>
            ),
        },
        {
            title: 'Personal Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(personalInfoAdminSchema)}>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHDatePicker
                            name="dateOfBirth"
                            required
                            style={{ borderRadius: '8px', width: "100%" }}
                            placeholder="Select Date of Birth (YYYY-MM-DD)"
                        />
                    </div>
                    <div style={{ marginBottom: '-35px' }}>
                        <PHSelect
                            name="gender"
                            options={genderOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Gender (Male/Female/Other)"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="bloodGroup"
                            options={bloodGroupOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Blood Group (Optional)"
                        />
                    </div>
                    <Row justify="start" gutter={10}>
                        <Col xs={24} sm={12} md={11}>
                            <Button
                                type="default"
                                onClick={onPrevious}
                                style={{
                                    borderRadius: '8px',
                                    marginRight: '10px',
                                    fontSize: '16px',
                                    width: '100%',
                                    backgroundColor: '#FF5733',
                                    color: '#fff',
                                }}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} md={11}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    width: '100%',
                                    backgroundColor: "green"
                                }}
                            >
                                Create Admin
                            </Button>
                        </Col>
                    </Row>
                </PHForm>
            ),
        },
    ];

    return (
        <div
            style={{
                minHeight: '90vh',
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
                    maxWidth: '850px',
                    width: '100%',
                }}>
                <Steps current={currentStep} size="small" style={{ marginBottom: '10px' }}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title} />
                    ))}
                </Steps>
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={registerAdminImg}
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
                            marginBottom: '0px',
                            fontFamily: 'Arial, sans-serif',
                        }}>
                        Register PH Admin
                    </h2>

                    {steps[currentStep].content}
                </Col>
            </Row>
        </div>
    );
};

export default CreateAdmin;