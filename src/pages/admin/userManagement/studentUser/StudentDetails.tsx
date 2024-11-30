import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagementApi";
import { Card, Avatar, Row, Col, Typography, List, Divider, Tabs, Result, Button } from "antd";
import Loading from "../../../Loading";
import { FileProtectOutlined, IdcardOutlined, MailOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const StudentDetails = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const { data: studentData, isLoading, isError } = useGetSingleStudentQuery(studentId || "");

    if (isLoading) {
        return <Loading />
    }

    if (isError || !studentData?.data) {
        return <Result
            status="error"
            title="Failed to Load Student Details"
            subTitle="Sorry, we are unable to load the student details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const student = studentData.data;

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
                                src={student.profileImg || "https://via.placeholder.com/120"}
                                alt="Profile"
                                style={{
                                    border: "2px solid #1890ff",
                                    marginBottom: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Title level={4} style={{ color: "black" }}>
                                {student.fullName}
                            </Title>
                            <Text type="secondary">
                                <IdcardOutlined style={{ marginRight: "8px" }} />
                                {student.id}
                            </Text>
                            <Divider />
                            <Text style={{ display: "block" }}>
                                <MailOutlined style={{ marginRight: "5px" }} />
                                <strong>Email:</strong> {student.email}
                            </Text>
                            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: "10px" }}>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <TeamOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Gender:</strong>{student.gender}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileProtectOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Blood:</strong> {student.BloodGroup}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Academic Information" key="1">
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
                                        { label: "Department", value: student.academicDepartment.name },
                                        {
                                            label: "Faculty",
                                            value: student.academicDepartment.academicFaculty.name,
                                        },
                                        {
                                            label: "Admission Semester",
                                            value: `${student.admissionSemester.name} (${student.admissionSemester.year}) (${student.admissionSemester.startMonth} - ${student.admissionSemester.endMonth})`,
                                        },
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

                        <TabPane tab="Contact Info" key="2">
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
                                        { label: "Email", value: student.email },
                                        { label: "Contact No", value: student.contactNo },
                                        { label: "Emergency Contact No", value: student.emergencyContactNo },
                                        { label: "Present Address", value: student.presentAddress },
                                        { label: "Permanent Address", value: student.permanentAddress },
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

                        <TabPane tab="Guardian Info" key="3">
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
                                        { label: "Father's Name", value: student.guardian.fatherName },
                                        { label: "Father's Occupation", value: student.guardian.fatherOccupation },
                                        { label: "Father's Contact Number", value: student.guardian.fatherContactNo },
                                        { label: "Mother's Name", value: student.guardian.motherName },
                                        { label: "Mother's Occupation", value: student.guardian.motherOccupation },
                                        { label: "Mother's Contact Number", value: student.guardian.motherContactNo },
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
                        <TabPane tab="Local Guardian Info" key="4">
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
                                        { label: "Name", value: student.localGuardian.name },
                                        { label: "Occupation", value: student.localGuardian.occupation },
                                        { label: "Contact No.", value: student.localGuardian.contactNo },
                                        { label: "Address", value: student.localGuardian.address },
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

export default StudentDetails;