import { Button, Popconfirm, Space, Table, TableProps, Pagination, Modal, Row, Col, Tag } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import { useEnrollCourseUpdateStudentMarkMutation, useGetAllFacultyCoursesQuery } from "../../../redux/features/faculty/facultyCourseManagementApi";
import Loading from "../../Loading";
import { TQueryParam } from "../../../types";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import assignFacultiesImg from "../../../assets/images/academic-department.avif";
import PHInput from "../../../components/form/PHInput";

const MyStudents = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { registerSemesterId, courseId } = useParams();

    const { data: facultyCoursesData, isLoading, isFetching } = useGetAllFacultyCoursesQuery([
        { name: "semesterRegistration", value: registerSemesterId },
        { name: "course", value: courseId },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);
    
    const columns: any = [
        {
            title: "Student Name",
            key: "name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
            render: (text: any) => <span style={{ fontWeight: 'bold' }}>{text}</span>, // Style for Admin Name
        },
        {
            title: "Roll No.",
            key: "studentId",
            dataIndex: "studentId",
            ellipsis: true,
        },
        {
            title: "Gender",
            key: "gender",
            dataIndex: "gender",
            ellipsis: true,
        },
        {
            title: "Contact No.",
            key: "contactNo",
            dataIndex: "contactNo",
            ellipsis: true,
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
            ellipsis: true,
        },
        {
            title: "Grade",
            key: "grade",
            dataIndex: "grade",
            ellipsis: true,
            render: (text: any) => <Tag color="green">{text}</Tag>
        },
        {
            title: "Grade Points",
            key: "gradePoints",
            dataIndex: "gradePoints",
            ellipsis: true,
            render: (text: any) => <Tag color="blue">{text}</Tag>
        },
        {
            title: "Course Status",
            key: "isCompleted",
            dataIndex: "isCompleted",
            ellipsis: true,
            render: (text: any) => text ? <Tag color="green">COMPLETED</Tag> : <Tag color="red">INCOMPLETE</Tag>
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item: any) => {
                return (
                    <Space size="small">
                        <AddMarksUpdate studentData={item} />

                        <Link to={`/admin/student-update-data/${item.key}`}>
                            <Button
                                icon={<EditOutlined />}
                                type="default"
                                size="small"
                                style={{ backgroundColor: "#1890ff", color: "#fff", borderColor: "#1890ff" }}
                            >
                                Update
                            </Button>
                        </Link>

                        <Popconfirm
                            title="Are you sure you want to delete this student?"
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                style={{ backgroundColor: "#ff4d4f", color: "#fff", borderColor: "#ff4d4f" }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>

                        <Link to={`/faculty/student-details-data/${item.key}`}>
                            <Button
                                icon={<InfoCircleOutlined />}
                                type="default"
                                size="small"
                                style={{ backgroundColor: "#52c41a", color: "#fff", borderColor: "#52c41a" }}
                            >
                                Details
                            </Button>
                        </Link>
                    </Space>
                );
            },
            width: "1%",
        }
    ];

    const studentTableData = facultyCoursesData?.data?.map((course: any) => ({
        key: course._id,
        name: course.student.fullName,
        studentId: course.student.id,
        _id: course.student._id,
        gender: course.student.gender,
        contactNo: course.student.contactNo,
        email: course.student.email,
        semesterRegistration: course.semesterRegistration._id,
        student: course.student._id,
        offeredCourse: course.offeredCourse._id,
        grade: course.grade,
        gradePoints: course.gradePoints,
        isCompleted: course.isCompleted,
    }));

    const studentMetaData = facultyCoursesData?.meta;

    if (isLoading) {
        return <Loading />;
    }

    const onChange: TableProps["onChange"] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    filters[key]?.forEach((value) => queryParams.push({ name: key, value }));
                }
            });

            setParams(queryParams);
        }
    };

    return (
        <>
            {/* Table */}
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={studentTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={studentMetaData?.limit}
                    total={studentMetaData?.total}
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

const AddMarksUpdate = ({ studentData }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateStudentMarks] = useEnrollCourseUpdateStudentMarkMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Student Updated Marks...");

        const studentMarksData = {
            semesterRegistration: studentData.semesterRegistration,
            offeredCourse: studentData.offeredCourse,
            student: studentData.student,
            courseMarks: {
                classTest1: Number(data.classTest1),
                midTerm: Number(data.midTerm),
                classTest2: Number(data.classTest2),
                finalTerm: Number(data.finalTerm),
            },
        };

        try {
            const res = await updateStudentMarks(studentMarksData);
            console.log(res);
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

    return (
        <>
            <Button
                onClick={showModal}
                icon={<UserAddOutlined />}
                type="default"
                size="small"
                style={{ backgroundColor: "green", color: "#fff" }}
            >
                Student Mark
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <Row
                        gutter={[16, 16]}>
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <img
                                src={assignFacultiesImg}
                                alt="Logo"
                                style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                                    marginBottom: '15px',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                Enrolled Course Mark
                            </h2>
                            <PHForm onSubmit={handleSubmit} /**resolver={zodResolver(enrollCourseUpdateStudentMarksSchema)} */>
                                <div style={{ marginBottom: '15px' }}>
                                    <PHInput
                                        type="number"
                                        name="classTest1"
                                        style={{ borderRadius: '8px' }}
                                        placeholder="Class Test One"
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <PHInput
                                        type="number"
                                        name="midTerm"
                                        style={{ borderRadius: '8px' }}
                                        placeholder="Mid Term"
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <PHInput
                                        type="number"
                                        name="classTest2"
                                        style={{ borderRadius: '8px' }}
                                        placeholder="Class Test Two"
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <PHInput
                                        type="number"
                                        name="finalTerm"
                                        style={{ borderRadius: '8px' }}
                                        placeholder="Final Term"
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        icon={<UserAddOutlined />}
                                        style={{
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            background: "green"
                                        }}
                                    >
                                        Assign Mark
                                    </Button>
                                </div>
                            </PHForm>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
};

export default MyStudents;
