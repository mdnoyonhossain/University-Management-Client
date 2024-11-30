import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../../redux/features/admin/userManagementApi";
import { Card, Avatar, Row, Col, Typography, List, Divider, Tabs, Result, Button } from "antd";
import Loading from "../../../Loading";
import { CrownOutlined, EnvironmentOutlined, FileProtectOutlined, IdcardOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const FacultyDetails = () => {
    const { facultyId } = useParams<{ facultyId: string }>();
    const { data: facultyData, isLoading, isError } = useGetSingleFacultyQuery(facultyId || "");

    if (isLoading) {
        return <Loading />
    }

    if (isError || !facultyData?.data) {
        return <Result
            status="error"
            title="Failed to Load Faculty Details"
            subTitle="Sorry, we are unable to load the faculty details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const faculty = facultyData.data;

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
                                src={faculty.profileImg || "https://via.placeholder.com/120"}
                                alt="Profile"
                                style={{
                                    border: "2px solid #1890ff",
                                    marginBottom: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Title level={4} style={{ color: "black" }}>
                                {faculty.fullName}
                            </Title>
                            <Text type="secondary">
                                <IdcardOutlined style={{ marginRight: "8px" }} />
                                {faculty.id}
                            </Text>
                            <Text type="secondary" style={{ marginLeft: "15px" }}>
                                <CrownOutlined style={{ marginRight: "8px" }} />
                                {faculty.designation}
                            </Text>
                            <Divider />
                            <Text style={{ display: "block" }}>
                                <EnvironmentOutlined style={{ paddingRight: "8px" }} />
                                <strong>Address:</strong> {faculty.presentAddress}
                            </Text>
                            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: "10px" }}>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <TeamOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Gender:</strong>{faculty.gender}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileProtectOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Blood:</strong> {faculty.bloogGroup}
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
                                        { label: "Academic Department", value: faculty.academicDepartment?.name }
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
                                        { label: "Email", value: faculty.email },
                                        { label: "Contact No", value: faculty.contactNo },
                                        { label: "Emergency Contact No", value: faculty.emergencyContactNo },
                                        { label: "Present Address", value: faculty.presentAddress },
                                        { label: "Permanent Address", value: faculty.permanentAddress },
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

export default FacultyDetails;
