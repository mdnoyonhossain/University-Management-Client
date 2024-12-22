import { useParams } from "react-router-dom";
import { Card, Avatar, Row, Col, Typography, List, Divider, Tabs, Result, Button, Tag } from "antd";
import { ClockCircleOutlined, FileProtectOutlined, IdcardOutlined, MailOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";
import Loading from "../../Loading";
import { useGetMySingleEnrolledCourseQuery } from "../../../redux/features/student/studentCourseManagementApi";
import moment from "moment";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MyScheduleDetails = () => {
    const { enrolledId } = useParams<{ enrolledId: string }>();
    const { data: enrolledData, isLoading, isError } = useGetMySingleEnrolledCourseQuery(enrolledId || "");

    if (isLoading) {
        return <Loading />
    }

    if (isError || !enrolledData?.data) {
        return <Result
            status="error"
            title="Failed to Load Schedule Details"
            subTitle="Sorry, we are unable to load the Schedule details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const enrolledCourse = enrolledData?.data;

    return (
        <div style={{ padding: "40px 20px", background: "#f9f9f9" }}>
            <Row gutter={32} justify="space-between">
                <Col xs={24} md={8}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            marginBottom: "24px",
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Avatar
                                size={120}
                                src={enrolledCourse.student?.profileImg || "https://via.placeholder.com/120"}
                                alt="Profile"
                                style={{
                                    border: "2px solid #1890ff",
                                    marginBottom: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Title level={4} style={{ color: "black" }}>
                                {enrolledCourse.student?.fullName}
                            </Title>
                            <Text type="secondary">
                                <IdcardOutlined style={{ marginRight: "8px" }} />
                                {enrolledCourse.student?.id}
                            </Text>
                            <Divider />
                            <Text style={{ display: "block" }}>
                                <MailOutlined style={{ marginRight: "5px" }} />
                                <strong>Email:</strong> {enrolledCourse.student?.email}
                            </Text>
                            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: "10px" }}>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <TeamOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Gender:</strong>{enrolledCourse.student?.gender}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileProtectOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Blood:</strong> {enrolledCourse.student?.BloodGroup}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Academic Info" key="1">
                            <Card
                                bordered={false}
                                hoverable
                                style={{
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "24px",
                                }}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        { label: "Academic Department Name", value: enrolledCourse.academicDepartment?.name },
                                        { label: "Academic Faculty Name", value: enrolledCourse.academicFaculty?.name },
                                        { label: "Academic Semester", value: `${enrolledCourse.academicSemester?.name} ${enrolledCourse.academicSemester?.year} (${enrolledCourse.academicSemester?.startMonth} - ${enrolledCourse.academicSemester?.endMonth}) - (Code-${enrolledCourse.academicSemester?.code})` },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<Text strong>{item.label}</Text>}
                                                description={item.value}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Class Schedule" key="2">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Card>
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "repeat(7, 1fr)",
                                                gap: "10px",
                                            }}
                                        >
                                            {enrolledCourse?.offeredCourse.days?.map((day: any) => {
                                                const isActive = enrolledCourse?.offeredCourse.days.includes(day);
                                                return (
                                                    <div
                                                        key={day}
                                                        style={{
                                                            textAlign: "center",
                                                            padding: "10px",
                                                            border: "1px solid #d9d9d9",
                                                            borderRadius: "5px",
                                                            backgroundColor: isActive ? "#e6f7ff" : "#fafafa",
                                                            cursor: isActive ? "pointer" : "default",
                                                        }}
                                                    >
                                                        <Text strong style={{ color: isActive ? "#1890ff" : "#bfbfbf" }}>
                                                            {day}
                                                        </Text>
                                                        {isActive && (
                                                            <Tag color="green" style={{ marginTop: "10px" }}>
                                                                <ClockCircleOutlined />{" "}
                                                                {`${moment(enrolledCourse?.offeredCourse?.startTime, "HH:mm").format("h:mm A")} - ${moment(enrolledCourse?.offeredCourse?.endTime, "HH:mm").format("h:mm A")}`}
                                                            </Tag>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Course Info" key="3">
                            <Card
                                bordered={false}
                                hoverable
                                style={{
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "24px",
                                }}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        { label: "Course Name", value: enrolledCourse.course?.title },
                                        { label: "Prefix", value: enrolledCourse.course?.prefix },
                                        { label: "Code", value: enrolledCourse.course?.code },
                                        { label: "credits", value: enrolledCourse.course?.credits },
                                        { label: "Enrollment Status", value: `${enrolledCourse.isEnrolled ? "Enrolled" : "Not Enrolled"}` },
                                        { label: "Course Status", value: `${enrolledCourse.isCompleted ? "COMPLETED" : "INCOMPLETED"}` },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<Text strong>{item.label}</Text>}
                                                description={item.value}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Course Marks" key="4">
                            <Card
                                bordered={false}
                                hoverable
                                style={{
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "24px",
                                }}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        { label: "Grade", value: enrolledCourse?.grade },
                                        { label: "Grade Points", value: enrolledCourse?.gradePoints },
                                        { label: "Course Marks Class Test One", value: enrolledCourse.courseMarks?.classTest1 },
                                        { label: "Course Marks Class Test Two", value: enrolledCourse.courseMarks?.classTest2 },
                                        { label: "Course Marks Class Final Term", value: enrolledCourse.courseMarks?.finalTerm },
                                        { label: "Course Marks Class Mid Term", value: enrolledCourse.courseMarks?.midTerm },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<Text strong>{item.label}</Text>}
                                                description={item.value}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Faculty Info" key="5">
                            <Card
                                bordered={false}
                                hoverable
                                style={{
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "24px",
                                }}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        { label: "Faculty Name", value: enrolledCourse.faculty?.fullName },
                                        { label: "Faculty Designation", value: enrolledCourse.faculty?.designation },
                                        { label: "Faculty ID", value: enrolledCourse.faculty?.id },
                                        { label: "Email", value: enrolledCourse.faculty?.email },
                                        { label: "Contact No.", value: enrolledCourse.faculty?.contactNo },
                                        { label: "Emergency Contact No.", value: enrolledCourse.faculty?.emergencyContactNo },
                                        { label: "Present Address", value: enrolledCourse.faculty?.presentAddress },
                                        { label: "Permanent Address", value: enrolledCourse.faculty?.permanentAddress },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<Text strong>{item.label}</Text>}
                                                description={item.value}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
};

export default MyScheduleDetails;