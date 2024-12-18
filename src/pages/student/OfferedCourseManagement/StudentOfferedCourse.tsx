import { Button, Space, Typography, Tag, Row, Col, Card } from 'antd';
import { useEnrolledCourseMutation, useGetMyOfferedCoursesQuery } from '../../../redux/features/student/studentCourseManagementApi';
import { BookOutlined, InfoCircleOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
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
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
      maxCapacity: item.maxCapacity
    });
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
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
              background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
              maxWidth: '500px',
              margin: 'auto',
            }}
            bordered={false}
            hoverable
          >
            <img
              src={noCourseAvailable}
              alt="no-data"
              style={{ width: '150px', height: 'auto', marginBottom: '20px' }}
            />
            <Typography.Title level={3} style={{ color: '#fff' }}>No Available Courses</Typography.Title>
            <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '20px', color: '#fff' }}>
              Currently, there are no courses available. Please check back later or contact your admin.
            </Text>
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              style={{
                borderRadius: '5px',
                padding: '10px 20px',
                background: '#FF4D4F',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Contact Admin
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
      {modifiedData?.map((item) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={item.courseTitle}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            {item.sections.map((section: any) => (
              <Card
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  background: '#f7f7f7',
                  transition: 'transform 0.3s ease',
                }}
                cover={<img alt="course-image" src={`https://dummyimage.com/600x400/000/fff&text=${section.section}`} />}
              >
                <Typography.Title style={{ color: "#1890ff" }} level={4}>{item.courseTitle}</Typography.Title>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                  <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                    <Tag color="purple" icon={<ClockCircleOutlined />} style={{ fontWeight: 'bold' }}>
                      {section.startTime} - {section.endTime}
                    </Tag>
                  </Col>
                  <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" style={{ textAlign: 'center' }}>
                    <Tag color="blue" icon={<TeamOutlined />} style={{ fontWeight: 'bold' }}>
                      {section.maxCapacity} Capacity
                    </Tag>
                  </Col>
                </Row>

                <Row justify="space-between" style={{ marginTop: '10px' }}>
                  <Col span={11}>
                    <Tag color="purple-inverse" icon={<CalendarOutlined />} style={{ fontWeight: 'bold' }}>
                      {section.days.join(', ')}
                    </Tag>
                  </Col>
                </Row>
                <Space direction="horizontal" size="small" style={{ marginTop: '25px' }}>
                  <Button
                    icon={<InfoCircleOutlined />}
                    type="default"
                    style={{
                      backgroundColor: "#17A2B8",
                      color: "#fff",
                      borderRadius: '5px',
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => handleEnrollCourse(section._id)}
                    icon={<BookOutlined />}
                    type="default"
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: '5px',
                    }}
                  >
                    Enroll
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </Col>
      ))}
    </Row>
  );
};

export default StudentOfferedCourse;