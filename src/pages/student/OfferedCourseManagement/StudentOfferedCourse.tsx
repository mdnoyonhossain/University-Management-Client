import { Button, Space, Typography, Tag, Table, Row, Col } from 'antd';
import { useGetMyOfferedCoursesQuery } from '../../../redux/features/student/studentCourseManagementApi';
import { BookOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Loading from '../../Loading';

const { Text } = Typography;

type TCourse = {
    [index: string]: any;
};

const StudentOfferedCourse = () => {
    const { data: myOfferedCourse, isLoading } = useGetMyOfferedCoursesQuery(undefined);

    const singleObject = myOfferedCourse?.data?.reduce((acc: TCourse, item) => {
        const key = item.course.title;
        acc[key] = acc[key] || { courseTitle: key, sections: [] };
        acc[key].sections.push({ ...item });
        return acc;
    }, {});

    const modifiedData = Object.values(singleObject ? singleObject : {});

    if (isLoading) {
        return <Loading />;
    }

    if (!modifiedData.length) {
        return <p>No available courses</p>;
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
            render: () => {
                return (
                    <Space size="small">
                        <Button
                            icon={<BookOutlined />}
                            type="default"
                            // size="small"
                            style={{ backgroundColor: "black", color: "#fff" }}
                        >
                            Enroll
                        </Button>
                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
                            // size="small"
                            style={{ backgroundColor: "#ff4d4f", color: "#fff", borderColor: "#ff4d4f" }}
                        >
                            Details
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
