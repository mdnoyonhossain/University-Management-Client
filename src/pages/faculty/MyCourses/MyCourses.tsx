import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { useGetAllFacultyCoursesQuery } from "../../../redux/features/faculty/facultyCourseManagementApi";
import { FieldValues } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { SearchOutlined } from "@ant-design/icons";
import enrolledCourseImg from "../../../assets/images/filter-enrolled-course.avif";
import Loading from "../../Loading";

const MyCourses = () => {
    const { data: facultyCoursesData, isLoading } = useGetAllFacultyCoursesQuery(undefined);
    console.log(facultyCoursesData);

    const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
        value: item.semesterRegistration._id,
        label: `${item.academicSemester.name} (Code - ${item.academicSemester.code}) (${item.academicSemester.year}) (${item.academicSemester.startMonth} - ${item.academicSemester.endMonth})`,
    })) || [];

    const coursesOptions = facultyCoursesData?.data?.map((item: any) => ({
        value: item.course._id,
        label: `${item.course.title} (Code-${item.course.code})`,
    })) || [];

    if (isLoading) {
        return <Loading />
    }

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }

    return (
        <div
            style={{
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
                    maxWidth: '900px',
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
                        src={enrolledCourseImg}
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
                        Register Academic Faculty
                    </h2>
                    <PHForm onSubmit={onSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect
                                name="semesterRegistration"
                                options={semesterOptions}
                                style={{ borderRadius: '8px' }}
                                placeholder="Select Semester Registration"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect
                                name="course"
                                options={coursesOptions}
                                style={{ borderRadius: '8px' }}
                                placeholder="Select Course"
                            />
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                icon={<SearchOutlined />}
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                }}
                            >
                                Search
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default MyCourses;