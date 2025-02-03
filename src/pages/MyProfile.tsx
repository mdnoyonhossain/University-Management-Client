import { Card, Avatar, Row, Col, Typography, List, Divider, Tabs, Result, Button } from "antd";
import { FileProtectOutlined, IdcardOutlined, MailOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";
import Loading from "./Loading";
import { useGetMyProfileQuery } from "../redux/features/admin/userManagementApi";
import moment from "moment";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MyProfile = () => {
    const { data: myProfileData, isLoading, isError } = useGetMyProfileQuery(undefined);

    if (isLoading) {
        return <Loading />
    }

    if (isError || !myProfileData?.data) {
        return <Result
            status="error"
            title="Failed to Load Profile Data Details"
            subTitle="Sorry, we are unable to load the Profile Data details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const profileData = myProfileData?.data;

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
                                src={profileData?.profileImg || "https://via.placeholder.com/120"}
                                alt="Profile"
                                style={{
                                    border: "2px solid #1890ff",
                                    marginBottom: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Title level={4} style={{ color: "black" }}>
                                {profileData?.fullName}
                            </Title>
                            <Text type="secondary">
                                <IdcardOutlined style={{ marginRight: "8px" }} />
                                {profileData?.id}
                            </Text>
                            <Divider />
                            <Text style={{ display: "block" }}>
                                <MailOutlined style={{ marginRight: "5px" }} />
                                <strong>Email:</strong> {profileData?.email}
                            </Text>
                            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: "10px" }}>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <TeamOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Gender:</strong>{profileData?.gender}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileProtectOutlined style={{ marginRight: "8px" }} />
                                        <strong style={{ marginRight: "5px" }}>Blood:</strong> {profileData?.bloodGroup}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Contact Info" key="1">
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
                                        { label: "Email", value: profileData.email },
                                        { label: "Contact No", value: profileData.contactNo },
                                        { label: "Emergency Contact No", value: profileData.emergencyContactNo },
                                        { label: "Present Address", value: profileData.presentAddress },
                                        { label: "Permanent Address", value: profileData.permanentAddress },
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
                        <TabPane tab="User Info" key="2">
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
                                        { label: "Role", value: profileData?.user?.role },
                                        { label: "Designation", value: profileData?.designation },
                                        { label: "isPassword Change?", value: profileData?.user?.needsPasswordChange ? "Yes" : "No" },
                                        { label: "isDeleted", value: profileData?.user?.isDeleted ? "Yes" : "No" },
                                        { label: "Status", value: profileData?.user?.status },
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
                        <TabPane tab="Account Info" key="3">
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
                                        { label: "Created Account", value: moment(profileData?.user?.createdAt).format('LLLL') },
                                        { label: "Updated Acccount", value: moment(profileData?.user?.updatedAt).format('LLLL') },
                                        { label: "Password Changed Updated", value: moment(profileData?.user?.passwordChangedAt).format('LLLL') },
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

export default MyProfile;