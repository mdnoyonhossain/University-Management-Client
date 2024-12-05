import { Button, Row, Col, Steps } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import offeredCourseImg from "../../../../assets/images/offere-course.jpg";
import PHForm from '../../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from 'react-hook-form';
import PHInput from '../../../../components/form/PHInput';
import { useState } from 'react';
import PHSelect from '../../../../components/form/PHSelect';
import { daysOptions } from '../../../../constants/global';
import { useGetAllFacultiesQuery } from '../../../../redux/features/admin/userManagementApi';
import { toast } from 'sonner';
import { GiftOutlined } from '@ant-design/icons';
import Loading from '../../../Loading';
import { useGetAllCoursesQuery, useGetAllRegistrationSemesterQuery } from '../../../../redux/features/admin/courseManagement';
import { useGetAllAcademicDepartmentsQuery, useGetAllAcademicFacultiesQuery } from '../../../../redux/features/admin/academicManagementApi';
import { offeredCourseAcademicCourseSchema, offeredCourseSectionDateTimeSchema } from '../../../../schemas/courseManagement';
import PHSelectWithWatch from '../../../../components/form/PHSelectWithWatch';

const { Step } = Steps;

const CreateOfferedCourses = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputFieldData, setInputFieldData] = useState({}); // Store form data here
    const [offeredCourseWatchId, setOfferedCourseWatchId] = useState("");

    const { data: semesterRegistrationData, isLoading: smrisLoading, error: smrError } = useGetAllRegistrationSemesterQuery(undefined);
    const { data: academicFacultyData, isLoading: acfisLoading, error: acferror } = useGetAllAcademicFacultiesQuery(undefined);
    const { data: academicDepartmentData, isLoading: acdisLoading, error: acderror } = useGetAllAcademicDepartmentsQuery(undefined);
    const { data: courseData, isLoading: courseisLoading, error: courseerror } = useGetAllCoursesQuery(undefined);
    const { data: facultyData, isLoading: facultyisLoading, error: facultyerror } = useGetAllFacultiesQuery(undefined);

    const semesterRegistrationOptions = semesterRegistrationData?.data?.map((semesterRegistrationItem: any) => ({
        value: semesterRegistrationItem._id,
        label: `${semesterRegistrationItem.academicSemester.name} (${semesterRegistrationItem.academicSemester.year}) (${semesterRegistrationItem.academicSemester.startMonth} - ${semesterRegistrationItem.academicSemester.endMonth})`,
    })) || [];

    const academicFacultyOptions = academicFacultyData?.data?.map((academicFacultyItem: any) => ({
        value: academicFacultyItem._id,
        label: academicFacultyItem.name
    })) || [];

    const academicDepartmentOptions = academicDepartmentData?.data?.map((academicDepartmentItem: any) => ({
        value: academicDepartmentItem._id,
        label: academicDepartmentItem.name
    })) || [];

    const courseOptions = courseData?.data?.map((courseItem: any) => ({
        value: courseItem._id,
        label: `${courseItem.title} (Code-${courseItem.code})`
    })) || [];

    const facultyOptions = facultyData?.data?.map((facultyItem: any) => ({
        value: facultyItem._id,
        label: facultyItem.fullName
    })) || [];

    if (smrisLoading || acfisLoading || acdisLoading || courseisLoading || facultyisLoading) {
        return <Loading />
    }

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
        const updateOfferCourseData = { ...inputFieldData, ...data };
        setInputFieldData(updateOfferCourseData);

        const offeredCoursesData = {
            ...updateOfferCourseData,
            maxCapacity: Number(data.maxCapacity),
            section: Number(data.section)
        }


        if (currentStep === steps.length - 1) {
            const toastId = toast.loading("Creating Offered Course...");
            console.log(offeredCoursesData);
            // try {
            //     const res = await addAdmin(offeredCoursesData);

            //     if ('error' in res) {
            //         const errorMessage = (res.error as any)?.data?.message;
            //         toast.error(errorMessage, { id: toastId });
            //     } else if ('data' in res) {
            //         toast.success(res.data.message, { id: toastId });
            //     }
            // } catch (err: any) {
            //     toast.error(err.message, { id: toastId });
            // }
        } else {
            onNext();
        }
    };

    const steps = [
        {
            title: 'Academic & Couse Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(offeredCourseAcademicCourseSchema)}>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelectWithWatch
                            name="semesterRegistration"
                            options={semesterRegistrationOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Semester Registration"
                            onValueChange={setOfferedCourseWatchId}
                            disabled={smrisLoading || !!smrError}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="academicFaculty"
                            options={academicFacultyOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Academic Faculty"
                            disabled={acfisLoading || !!acferror || !offeredCourseWatchId}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="academicDepartment"
                            options={academicDepartmentOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Academic Department"
                            disabled={acdisLoading || !!acderror}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="course"
                            options={courseOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Course"
                            disabled={courseisLoading || !!courseerror}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="faculty"
                            options={facultyOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Faculty"
                            disabled={facultyisLoading || !!facultyerror}
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
            title: 'Section & Date Time Info',
            content: (
                <PHForm onSubmit={onSubmit} resolver={zodResolver(offeredCourseSectionDateTimeSchema)}>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="number"
                            name="maxCapacity"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Offered Course maxCapacity"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="number"
                            name="section"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Offered Course Section"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHSelect
                            name="days"
                            mode='multiple'
                            options={daysOptions}
                            style={{ width: '100%' }}
                            placeholder="Select Days"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="startTime"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Offered Course Start Time"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <PHInput
                            type="text"
                            name="endTime"
                            style={{ borderRadius: '8px' }}
                            placeholder="Enter Offered Course End Time"
                        />
                    </div>
                    <Row justify="start" gutter={10}>
                        <Col xs={24} sm={12} md={11}>
                            <Button
                                type="default"
                                onClick={onPrevious}
                                style={{
                                    marginRight: '10px',
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
                                    width: '100%',
                                    backgroundColor: "green"
                                }}
                                icon={<GiftOutlined />}
                            >
                                Offered Course
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
                        src={offeredCourseImg}
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
                        Create Offered Course
                    </h2>

                    {steps[currentStep].content}
                </Col>
            </Row>
        </div>
    );
};

export default CreateOfferedCourses;