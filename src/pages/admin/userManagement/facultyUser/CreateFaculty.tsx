import { Button, Row, Col, Steps, Form, Upload } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../assets/images/banner.avif";
import registerFacultyImg from "../../../assets/images/academic-faculty.jpg";
import PHForm from '../../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues } from 'react-hook-form';
import PHInput from '../../../../components/form/PHInput';
import { useState } from 'react';
import PHSelect from '../../../../components/form/PHSelect';
import { bloodGroupOptions, genderOptions } from '../../../../constants/global';
import PHDatePicker from '../../../../components/form/PHDatePicker';
import { useGetAllAcademicDepartmentsQuery } from '../../../../redux/features/admin/academicManagementApi';
import { useCreateFacultyMutation } from '../../../../redux/features/admin/userManagementApi';
import { UploadOutlined } from "@ant-design/icons";
import { toast } from 'sonner';
import { facultyAcademicInfoSchema, facultyContactInfoSchema, personalInfoFacultySchema } from '../../../../schemas/userManagement.schema';
import Loading from '../../../Loading';

const { Step } = Steps;

const CreateFaculty = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputFieldData, setInputFieldData] = useState({}); // Store form data here
    const [addFaculty] = useCreateFacultyMutation();
    const { data: academicDepartmentData, isLoading: adIsLoading, error: adError } = useGetAllAcademicDepartmentsQuery(undefined);

    const academicDepartmentOptions = academicDepartmentData?.data?.map((academicDepartment: any) => ({
        value: academicDepartment._id,
        label: `${academicDepartment.name}`,
    })) || [];

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

    if (adIsLoading) {
        return <Loading />
    }

    const onSubmit = async (data: FieldValues) => {
        const updatedFacultyData = { ...inputFieldData, ...data, ...data.profileImg };
        setInputFieldData(updatedFacultyData);

        const facultyData = {
            password: "faculty123",
            faculty: updatedFacultyData
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(facultyData));
        formData.append("file", updatedFacultyData.profileImg);

        if (currentStep === steps.length - 1) {
            const toastId = toast.loading("Register Faculty...");

            try {
                const res = await addFaculty(formData);

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
            title: 'Personal Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(personalInfoFacultySchema)}>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="name.firstName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="name.middleName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Middle Name (Optional)"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="name.lastName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="gender"
                            options={genderOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Gender (Male/Female/Other)"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="bloogGroup"
                            options={bloodGroupOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Blood Group (Optional)"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHDatePicker
                            name="dateOfBirth"
                            required
                            style={{ borderRadius: '8px', width: "100%" }}
                            placeholder="Select Date of Birth (YYYY-MM-DD)"
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
                <PHForm onSubmit={onSubmit} resolver={zodResolver(facultyContactInfoSchema)}>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="email"
                            name="email"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="number"
                            name="contactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="number"
                            name="emergencyContactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter emergency contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
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
            title: 'Academic Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(facultyAcademicInfoSchema)}>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="academicDepartment"
                            options={academicDepartmentOptions}
                            style={{ width: '100%' }}
                            placeholder="Select your Academic Department"
                            disabled={adIsLoading || !!adError}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="designation"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Faculty Designation"
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
                                Create Faculty
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
                        src={registerFacultyImg}
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
                        Register PH Faculty
                    </h2>

                    {steps[currentStep].content}
                </Col>
            </Row>
        </div>
    );
};

export default CreateFaculty;