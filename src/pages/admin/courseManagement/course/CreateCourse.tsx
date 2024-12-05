import { Button, Row, Col, Result } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import createSemesterImg from "../../../../assets/images/create-course.jpg";
import PHForm from '../../../../components/form/PHForm';
import PHSelect from '../../../../components/form/PHSelect';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import PHInput from '../../../../components/form/PHInput';
import { createCourseSchema } from '../../../../schemas/courseManagement';
import { useCreateCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/admin/courseManagement';
import Loading from '../../../Loading';
import { ReloadOutlined } from "@ant-design/icons";
import { TCourse } from '../../../../types';

const CreateCourse = () => {
    const { data: allCourses, isLoading, isError } = useGetAllCoursesQuery([{ name: "sort", value: "code" }]);
    const [createCourse] = useCreateCourseMutation();

    const preRequisiteCoursesOptions = allCourses?.data?.map((allCoursesItem: any) => ({
        value: allCoursesItem._id,
        label: `${allCoursesItem.title} (Code-${allCoursesItem.code})`,
    })) || [];

    if (isLoading) {
        return <Loading />
    }

    if (isError || !allCourses?.data) {
        return <Result
            status="error"
            title="Failed to Load Courses"
            subTitle="Sorry, we are unable to load the Courses details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating Course...");

        const courseData = {
            title: data.title,
            prefix: data.prefix,
            code: Number(data.code),
            credits: Number(data.credits),
            preRequisiteCourses: data?.preRequisiteCourses ? data?.preRequisiteCourses?.map((item: TCourse) => ({
                course: item,
                isDeleted: false
            })) : [],
            isDeleted: false
        }

        try {
            const res = await createCourse(courseData);

            if ('error' in res) {
                const errorMessage = (res.error as any)?.data?.message;
                toast.error(errorMessage, { id: toastId });
            } else if ('data' in res) {
                toast.success(res.data.message, { id: toastId });
            }
        } catch (err: any) {
            toast.error(err.message, { id: toastId });
        }
    }

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
                {/* Left Column: Image */}
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src={createSemesterImg}
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
                        Create PH Course
                    </h2>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(createCourseSchema)}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="title"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Course Title"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="prefix"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Course Prefix"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="number"
                                name="code"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Course Code"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="number"
                                name="credits"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Course Credits"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect
                                mode='multiple'
                                name="preRequisiteCourses"
                                options={preRequisiteCoursesOptions}
                                style={{ width: '100%' }}
                                placeholder="Select Prerequisite Courses"
                            />
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
                                Create Course
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateCourse;