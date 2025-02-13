import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TQueryParam } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useDeleteOfferedCourseMutation, useGetAllOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const OfferedCourses = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();
    const { data: offeredCourseData, isLoading, isFetching } = useGetAllOfferedCourseQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "-createdAt" },
        ...params
    ]);

    const handleDeleteOfferedCourse = async (id: string) => {
        const toastId = toast.loading("Delete Student...");
        try {
            const res = await deleteOfferedCourse(id);

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

    const columns: TableColumnsType = [
        {
            title: "Offered Course",
            key: "course",
            dataIndex: "course",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: "Academic Semester",
            key: "academicSemester",
            dataIndex: "academicSemester",
            ellipsis: true,
        },
        {
            title: "Faculty Name",
            key: "faculty",
            dataIndex: "faculty",
            ellipsis: true,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            ellipsis: true,
            render: (time: string) => <Tag color="blue">{time}</Tag>,
        },
        {
            title: "Days",
            key: "days",
            dataIndex: "days",
            ellipsis: true,
            render: (day: string) => <Tag color="purple">{day}</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item: any) => {
                return (
                    <Space size="small">
                        <Link to={`/admin/offered-course-details-data/${item.key}`}>
                            <Button
                                icon={<InfoCircleOutlined />}
                                type="default"
                                size="small"
                                style={{ backgroundColor: "black", color: "#fff", borderColor: "black" }}
                            >
                                Details
                            </Button>
                        </Link>

                        <Popconfirm
                            title="Are you sure you want to delete this student?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDeleteOfferedCourse(item?.semesterRegistrationId)}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                style={{ backgroundColor: "#ff4d4f", color: "#fff", borderColor: "#ff4d4f" }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
            width: "1%",
        }
    ];

    const semesterRegistrationTableData: any = offeredCourseData?.data?.map((offeredCourseItem: any) => ({
        key: offeredCourseItem._id,
        course: offeredCourseItem.course.title,
        academicSemester: `${offeredCourseItem.academicSemester.name} ${offeredCourseItem.academicSemester.year} (${offeredCourseItem.academicSemester.startMonth} - ${offeredCourseItem.academicSemester.endMonth})`,
        faculty: offeredCourseItem.faculty.fullName,
        days: offeredCourseItem.days.join(", "),
        time: `${moment(offeredCourseItem.startTime, "HH:mm").format("h:mm A")} - ${moment(offeredCourseItem.startTime, "HH:mm").format("h:mm A")}`,
        semesterRegistrationId: offeredCourseItem.semesterRegistration._id
    }));
    console.log(offeredCourseData);

    const offeredCourseMetaData = offeredCourseData?.meta;

    if (isLoading) {
        return <Loading />;
    }

    const onChange: TableProps<any>["onChange"] = (_pagination, filters, _sorter, extra) => {
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
            <Table<any>
                loading={isFetching}
                columns={columns}
                dataSource={semesterRegistrationTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={offeredCourseMetaData?.limit}
                    total={offeredCourseMetaData?.total}
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

export default OfferedCourses;