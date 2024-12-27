import { useParams } from "react-router-dom";
import { Layout, Tabs, Typography, Card, Button, Row, Col, Result, Tag } from "antd";
import { ClockCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import userProfileImg from "../../../../assets/images/avatar.jpg";
import moment from "moment";
import Loading from "../../../Loading";
import { useAdminGetSingleOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement";

const { Content } = Layout;
const { Text } = Typography;

const OfferedCourseDetails = () => {
    const { offeredCourseId } = useParams<{ offeredCourseId: string }>();
    const { data: offeredCourseData, isLoading, isError } = useAdminGetSingleOfferedCourseQuery(offeredCourseId || "");

    if (isLoading) {
        return <Loading />
    }

    if (isError || !offeredCourseData?.data) {
        return <Result
            status="error"
            title="Failed to Offered Course Course Details"
            subTitle="Sorry, we are unable to load the Course details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const offeredCours = offeredCourseData?.data;

    return (
        <Layout>
            <Content style={{ margin: "15px" }}>
                <Card>
                    <Tabs defaultActiveKey="1" type="line">
                        <Tabs.TabPane tab="Offered Course Schedule" key="1">
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
                                            {offeredCours.days?.map((day: any) => {
                                                const isActive = offeredCours?.days.includes(day);
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
                                                                {`${moment(offeredCours.startTime, "HH:mm").format("h:mm A")} - ${moment(offeredCours.endTime, "HH:mm").format("h:mm A")}`}
                                                            </Tag>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Course Info" key="2">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Card>
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 2fr",
                                                rowGap: "15px",
                                                columnGap: "10px",
                                                padding: "10px",
                                                border: "1px solid #d9d9d9",
                                                borderRadius: "5px",
                                                backgroundColor: "#E6F7FF",
                                            }}
                                        >
                                            <Text strong>Course Name:</Text>
                                            <div>{offeredCours.course?.title || "N/A"}</div>

                                            <Text strong>Section:</Text>
                                            <div>{offeredCours.section || "N/A"}</div>

                                            <Text strong>Max Capacity:</Text>
                                            <div>{offeredCours.maxCapacity || "N/A"}</div>

                                            <Text strong>Code:</Text>
                                            <div>{offeredCours.course?.code || "N/A"}</div>

                                            <Text strong>Prefix:</Text>
                                            <div>{offeredCours.course?.prefix || "N/A"}</div>

                                            <Text strong>Credits:</Text>
                                            <div>{offeredCours.course?.credits || "N/A"}</div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Academic Info" key="3">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Card>
                                        <Text strong>Academic Department:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours.academicDepartment?.name}</div>
                                        <Text strong>Academic Faculty:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours.academicFaculty?.name}</div>
                                        <Text strong>Academic Semester:</Text>
                                        <div style={{ marginBottom: "15px" }}>{`${offeredCours.academicSemester?.name} ${offeredCours.academicSemester?.year} (${offeredCours.academicSemester?.startMonth} - ${offeredCours.academicSemester?.endMonth}) (Code - ${offeredCours.academicSemester?.code})`}</div>
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>

                        {/* Instructor Tab */}
                        <Tabs.TabPane tab="Faculty Info" key="4">
                            <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
                                <Col xs={24} md={12}>
                                    <Card>
                                        <Text strong>Name:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.fullName}</div>

                                        <Text strong>Instructor ID:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.id}</div>

                                        <Text strong>Designation:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.designation}</div>

                                        <Text strong>Blood Group:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.bloogGroup}</div>

                                        <Text strong>Gender:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.gender}</div>

                                        <Text strong>Email:</Text>
                                        <div>{offeredCours?.faculty?.email}</div>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card>
                                        <Text strong>Contact No:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.contactNo}</div>

                                        <Text strong>Emergency Contact No:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.emergencyContactNo}</div>

                                        <Text strong>Permanent Address:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.permanentAddress}</div>

                                        <Text strong>Present Address:</Text>
                                        <div style={{ marginBottom: "15px" }}>{offeredCours?.faculty?.presentAddress}</div>

                                        <Text strong>Emergency Contact No:</Text>
                                        <div>{offeredCours?.faculty?.emergencyContactNo}</div>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card>
                                        <img style={{ width: "100%", height: "auto", borderRadius: "5px" }} src={offeredCours?.faculty?.profileImg ? offeredCours?.faculty?.profileImg : userProfileImg} alt="" />
                                    </Card>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Content>
        </Layout>
    );
};

export default OfferedCourseDetails;