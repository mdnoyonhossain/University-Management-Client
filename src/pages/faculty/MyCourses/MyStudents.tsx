import { Button, Popconfirm, Space, Table, TableProps, Pagination } from "antd";
import { useState } from "react";

import { EditOutlined, DeleteOutlined, InfoCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import { useGetAllFacultyCoursesQuery } from "../../../redux/features/faculty/facultyCourseManagementApi";
import Loading from "../../Loading";
import { TQueryParam } from "../../../types";

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
    console.log(facultyCoursesData);

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
            title: 'Actions',
            key: 'actions',
            render: (item: any) => {
                return (
                    <Space size="small">
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
        email: course.student.email
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

export default MyStudents;
