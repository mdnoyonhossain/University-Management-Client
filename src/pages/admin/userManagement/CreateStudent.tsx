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
import PHSelect from '../../../components/form/PHSelect';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import PHDatePicker from '../../../components/form/PHDatePicker';
import { useGetAllAcademicDepartmentsQuery, useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagementApi';
import { useCreateStudentMutation } from '../../../redux/features/admin/userManagementApi';
import { toast } from 'sonner';

const { Step } = Steps;

const CreateStudent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputFieldData, setInputFieldData] = useState({}); // Store form data here
    const [addStudent] = useCreateStudentMutation();
    const { data: admissionSemesterData, isLoading: asIsLoading, error: asError } = useGetAllSemestersQuery(undefined);
    const { data: academicDepartmentData, isLoading: adIsLoading, error: adError } = useGetAllAcademicDepartmentsQuery(undefined);

    const admissionSemesterOptions = admissionSemesterData?.data?.map((admissionSemester: any) => ({
        value: admissionSemester._id,
        label: `${admissionSemester.name} (${admissionSemester.year}) - (${admissionSemester.startMonth} - ${admissionSemester.endMonth})`,
    })) || [];

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

    const onSubmit = async (data: FieldValues) => {
        const updatedStudentData = { ...inputFieldData, ...data };
        setInputFieldData(updatedStudentData);

        const studentData = {
            password: "student123",
            student: updatedStudentData
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(studentData));

        if (currentStep === steps.length - 1) {
            const toastId = toast.loading("Register Student...");

            try {
                const res = await addStudent(formData);

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
                <PHForm onSubmit={onSubmit} >
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
                        <PHDatePicker
                            name="dateOfBirth"
                            style={{ borderRadius: '8px', width: "100%" }}
                            placeholder="Select Date of Birth (YYYY-MM-DD)"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="BloodGroup"
                            options={bloodGroupOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Blood Group (Optional)"
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
                <PHForm onSubmit={onSubmit} >
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
                            type="text"
                            name="contactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter your contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
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
            title: 'Guardian Info',
            content: (
                <PHForm onSubmit={onSubmit} >
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.fatherName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter father's full name"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.fatherOccupation"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter father's occupation"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.fatherContactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter father's contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.motherName"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter mother's full name"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.motherOccupation"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter mother's occupation"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="guardian.motherContactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter mother's contact number"
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
            title: 'Local Guardian Info',
            content: (
                <PHForm onSubmit={onSubmit} >
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="localGuardian.name"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter full name of local guardian"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="localGuardian.occupation"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter occupation of local guardian"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="localGuardian.contactNo"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter local guardian's contact number"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="localGuardian.address"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter local guardian's address"
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
                <PHForm onSubmit={onSubmit} /**resolver={zodResolver(academicFacultySchema)} */>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="admissionSemester"
                            options={admissionSemesterOptions}
                            style={{ width: '100%' }}
                            placeholder="Select your admission semester"
                            disabled={asIsLoading || !!asError}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="academicDepartment"
                            options={academicDepartmentOptions}
                            style={{ width: '100%' }}
                            placeholder="Select your academic department"
                            disabled={adIsLoading || !!adError}
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
                                Create Student
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

                    {steps[currentStep].content}
                </Col>
            </Row>
        </div>
    );
};

export default CreateStudent;