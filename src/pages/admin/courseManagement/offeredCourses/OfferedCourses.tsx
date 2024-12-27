import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TQueryParam } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useGetAllOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement";
import moment from "moment";

const OfferedCourses = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: offeredCourseData, isLoading, isFetching } = useGetAllOfferedCourseQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "createdAt" },
        ...params
    ]);
    
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
            render: () => {
                return (
                    <Space size="small">
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            size="small"
                            style={{ backgroundColor: "#1890ff", color: "#fff", borderColor: "#1890ff" }}
                        >
                            Update
                        </Button>

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

                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
                            size="small"
                            style={{ backgroundColor: "#52c41a", color: "#fff", borderColor: "#52c41a" }}
                        >
                            Details
                        </Button>
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
    }));

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