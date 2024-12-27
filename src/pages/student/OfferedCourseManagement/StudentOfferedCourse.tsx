import { Button, Space, Typography, Tag, Row, Col, Card, Pagination, Result } from 'antd';
import { useEnrolledCourseMutation, useGetMyOfferedCoursesQuery } from '../../../redux/features/student/studentCourseManagementApi';
import { BookOutlined, InfoCircleOutlined, ClockCircleOutlined, TeamOutlined, ArrowLeftOutlined, ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import Loading from '../../Loading';
import { toast } from 'sonner';
import { useState } from 'react';
import { TQueryParam } from '../../../types';
import { Link } from 'react-router-dom';
import moment from 'moment';

type TCourse = {
  [index: string]: any;
};

const StudentOfferedCourse = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: myOfferedCourse, isLoading, isError } = useGetMyOfferedCoursesQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    { name: "limit", value: 6 },
    ...params
  ]);
  const [createEnrollCourse] = useEnrolledCourseMutation();

  const singleObject = myOfferedCourse?.data?.reduce((acc: TCourse, item) => {
    const key = `${item.course.title}`;
    acc[key] = acc[key] || { courseTitle: key, _id: item._id, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item?._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
      maxCapacity: item.maxCapacity
    });
    return acc;
  }, {});

  const myOfferedCourseMetaData = myOfferedCourse?.meta;

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

  if (isError) {
    return <Result
      status="error"
      title="Failed to Student Offered Courses"
      subTitle="Sorry, we are unable to load the Student Offered Courses at the moment. Please try again later."
      extra={
        <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
          Retry
        </Button>
      }
    />
  }

  if (!modifiedData?.length) {
    return <Result
      status="warning"
      title="Course Not Available for You!"
      subTitle="Sorry, Course Not Available at the moment. Please try again later."
    />
  }

  return (
    <>
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
                    border: "15px solid #FFFFFF",
                  }}
                  cover={<img alt="course-image" src={`https://dummyimage.com/600x400/000/fff&text=${section.section}`} />}
                >
                  <Typography.Title style={{ color: "#1890ff" }} level={4}>{item.courseTitle}</Typography.Title>
                  <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col span={24}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: "5px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "5px",
                          backgroundColor: "#e6f7ff",
                          cursor: "pointer",
                          width: "100%", // Set width to 100%
                        }}
                      >
                        <p style={{ color: "#1890ff" }}>{section.days.join(', ')}</p>
                        <Tag color="green">
                          <ClockCircleOutlined />
                          {`${moment(section.startTime, "HH:mm").format("h:mm A")} - ${moment(section.endTime, "HH:mm").format("h:mm A")}`}
                        </Tag>
                      </div>
                    </Col>
                    <Col span={24} style={{marginTop: "5px"}}>
                      <div
                        style={{
                          textAlign: "center",
                          padding: "5px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "5px",
                          backgroundColor: "#E6F7FF",
                          cursor: "pointer",
                          width: "100%", // Set width to 100%
                        }}
                      >
                        <p style={{ color: "purple" }}>Capacity</p>
                        <Tag color="purple">
                          <TeamOutlined />
                          {section.maxCapacity} Available
                        </Tag>
                      </div>
                    </Col>
                  </Row>
                  <Space direction="horizontal" size="small" style={{ marginTop: '25px' }}>
                    <Link to={`/student/offered-course-details-data/${item._id}`}>
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
                    </Link>
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

      {/* Custom Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Pagination
          current={page}
          pageSize={myOfferedCourseMetaData?.limit}
          total={myOfferedCourseMetaData?.total}
          onChange={(value, pageSize) => {
            setPage(value);
            setParams((prevParams) =>
              prevParams.map((param) =>
                param.name === "limit" ? { ...param, value: pageSize } : param
              )
            );
          }}
          style={{
            backgroundColor: "#ffffff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #d9d9d9",
          }}
          itemRender={(_current, type, originalElement) => {
            if (type === "prev") {
              return (
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#FF4D4F",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "0 8px",
                  }}
                >
                  <ArrowLeftOutlined /> Previous
                </Button>
              );
            }
            if (type === "next") {
              return (
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#1677ff",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "0 8px",
                  }}
                >
                  Next <ArrowRightOutlined />
                </Button>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </>
  );
};

export default StudentOfferedCourse;