import { useParams } from "react-router-dom";
import { Card, Avatar, Row, Col, Typography, List, Divider, Tabs, Result, Button } from "antd";
import Loading from "../../../Loading";
import { CrownOutlined, FileProtectOutlined, IdcardOutlined, MailOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/userManagementApi";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const AdminDetails = () => {
    const { adminId } = useParams<{ adminId: string }>();
    const { data: adminData, isLoading, isError } = useGetSingleAdminQuery(adminId || "");

    if (isLoading) {
        return <Loading />
    }

    if (isError || !adminData?.data) {
        return <Result
            status="error"
            title="Failed to Load Admin Details"
            subTitle="Sorry, we are unable to load the admin details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const admin = adminData.data;

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
                                src={admin.profileImg || "https://via.placeholder.com/120"}
                                alt="Profile"
                                style={{
                                    border: "2px solid #1890ff",
                                    marginBottom: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Title level={4} style={{ color: "black" }}>
                                {admin.fullName}
                            </Title>
                            <Text type="secondary">
                                <IdcardOutlined style={{ marginRight: "8px" }} />
                                {admin.id}
                            </Text>
                            <Text type="secondary" style={{ marginLeft: "15px" }}>
                                <CrownOutlined style={{ marginRight: "8px" }} />
                                {admin.designation}
                            </Text>
                            <Divider />
                            <Text style={{ display: "block" }}>
                                <MailOutlined style={{ marginRight: "5px" }} />
                                <strong>Email:</strong> {admin.email}
                            </Text>
                            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: "10px" }}>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <TeamOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Gender:</strong>{admin.gender}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileProtectOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Blood:</strong> {admin.bloodGroup}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Contact Information" key="1">
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
                                        { label: "Email", value: admin.email },
                                        { label: "Contact No", value: admin.contactNo },
                                        { label: "Emergency Contact No", value: admin.emergencyContactNo },
                                        { label: "Present Address", value: admin.presentAddress },
                                        { label: "Permanent Address", value: admin.permanentAddress },
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

export default AdminDetails;