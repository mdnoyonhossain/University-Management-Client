import { Button, Space, Typography, Tag, Table, Row, Col, Card } from 'antd';
import { useEnrolledCourseMutation, useGetMyOfferedCoursesQuery } from '../../../redux/features/student/studentCourseManagementApi';
import { BookOutlined, InfoCircleOutlined } from '@ant-design/icons';
import noCourseAvailable from "../../../assets/images/no-available.jpg";
import Loading from '../../Loading';
import { toast } from 'sonner';

const { Text } = Typography;

type TCourse = {
    [index: string]: any;
};

const StudentOfferedCourse = () => {
    const { data: myOfferedCourse, isLoading } = useGetMyOfferedCoursesQuery(undefined);
    const [createEnrollCourse] = useEnrolledCourseMutation();

    const singleObject = myOfferedCourse?.data?.reduce((acc: TCourse, item) => {
        const key = `${item.course.title} (Code - ${item.course.code})`;
        acc[key] = acc[key] || { courseTitle: key, sections: [] };
        acc[key].sections.push({ ...item });
        return acc;
    }, {});

    const modifiedData = Object.values(singleObject ? singleObject : {});

    const handleEnrollCourse = async (id: string) => {
        const toastId = toast.loading("Enroll Course...");
        const enrollData = {
            offeredCourse: id
        }

        try {
            const res = await createEnrollCourse(enrollData);

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

    if (isLoading) {
        return <Loading />;
    }


    if (!modifiedData?.length) {
        return (
            <Row gutter={[16, 16]} style={{ marginTop: '20px', justifyContent: 'center' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '40px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
                            background: '#f9f9f9',
                        }}
                        bordered={false}
                    >
                        <img
                            src={noCourseAvailable}
                            alt="no-data"
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <Typography.Title level={3}>No Courses Available</Typography.Title>
                        <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '20px' }}>
                            Currently, there are no courses available. Please check back later or contact your admin.
                        </Text>
                        <Button type="primary" icon={<InfoCircleOutlined />} style={{ borderRadius: '5px' }}>
                            Contact Admin
                        </Button>
                    </Card>
                </Col>
            </Row>
        );
    }

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'courseTitle',
            key: 'courseTitle',
            render: (text: string) => <Text strong style={{ color: '#1d1d1d' }}>{text}</Text>, // Custom font color
        },
        {
            title: 'Section',
            dataIndex: 'section',
            key: 'section',
            render: (text: string) => <Text style={{ color: 'green' }}>{text}</Text>, // Custom font color
        },
        {
            title: 'Days',
            dataIndex: 'days',
            key: 'days',
            render: (days: string[]) => (
                <>
                    {days?.map((day, idx) => (
                        <Tag key={idx} color="geekblue">{day}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Max Capacity',
            dataIndex: 'maxCapacity',
            key: 'maxCapacity',
            render: (text: string) => <Tag color='red'>{text} Capacity</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item: any) => {
                console.log(item);
                return (
                    <Space size="small">
                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
                            // size="small"
                            style={{ backgroundColor: "#ff4d4f", color: "#fff", borderColor: "#ff4d4f" }}
                        >
                            Details
                        </Button>
                        <Button
                            onClick={() => handleEnrollCourse(item.key)}
                            icon={<BookOutlined />}
                            type="default"
                            style={{ backgroundColor: "green", color: "#fff", border: "1px solid green" }}
                        >
                            Enroll
                        </Button>
                    </Space>
                );
            },
            width: "1%",
        }
    ];

    const flattenedData = modifiedData.flatMap(item =>
        item.sections.map((section: any) => ({
            key: section._id,
            courseTitle: item.courseTitle,
            section: section.section,
            days: section.days,
            startTime: section.startTime,
            endTime: section.endTime,
            maxCapacity: section.maxCapacity
        }))
    );

    return (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={flattenedData}
                        pagination={false}
                        bordered
                        rowKey="key"
                        scroll={{ x: 'max-content' }}
                    />
                </Space>
            </Col>
        </Row>
    );
};

export default StudentOfferedCourse;