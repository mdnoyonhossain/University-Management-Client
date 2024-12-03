import { Button, Dropdown, Pagination, Popconfirm, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TQueryParam, TSemesterRegistration } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, CheckCircleOutlined, HourglassOutlined, CloseCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useGetAllRegistrationSemesterQuery } from "../../../../redux/features/admin/courseManagement";
import moment from "moment";

type TTableData = Pick<TSemesterRegistration, "academicSemester" | "status" | "startDate" | "endDate" | "minCredit" | "maxCredit">;

const items = [
    {
        label: 'Upcoming',
        key: 'UPCOMING',
        icon: <HourglassOutlined />,
    },
    {
        label: 'Ongoing',
        key: 'ONGOING',
        icon: <CheckCircleOutlined />,
    },
    {
        label: 'Ended',
        key: 'ENDED',
        icon: <CloseCircleOutlined />,
        danger: true,
    }
];

const SemesterRegistration = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: semesterRegistrationData, isLoading, isFetching } = useGetAllRegistrationSemesterQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = semesterRegistrationData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value),
            value: typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value),
        }));
    };

    const handleStatusDropdown = (data) => {
        console.log(data);
    }

    const menuProps = {
        items,
        onClick: handleStatusDropdown,
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Academic Semester",
            key: "academicSemester",
            dataIndex: "academicSemester",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            filters: getUniqueValues("status"),
            ellipsis: true,
            render: (item) => {
                let color;
                if (item === "UPCOMING") {
                    color = "blue"
                }
                if (item === "ONGOING") {
                    color = "green"
                }
                if (item === "ENDED") {
                    color = "red"
                }
                return <Tag color={color}>{item}</Tag>
            }
        },
        {
            title: "Start Date",
            key: "startDate",
            dataIndex: "startDate",
            ellipsis: true,
        },
        {
            title: "End Date",
            key: "endDate",
            dataIndex: "endDate",
            ellipsis: true,
        },
        {
            title: "Min Credit",
            key: "minCredit",
            dataIndex: "minCredit",
            filters: getUniqueValues("minCredit"),
            ellipsis: true,
        },
        {
            title: "Max Credit",
            key: "maxCredit",
            dataIndex: "maxCredit",
            filters: getUniqueValues("maxCredit"),
            ellipsis: true,
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

                        <Dropdown menu={menuProps} trigger={['click']}>
                            <Button
                                onClick={handleStatusDropdown}
                                icon={<DownOutlined />}
                                type="default"
                                size="small"
                                style={{ backgroundColor: "blue", color: "#fff", borderColor: "#1890ff" }}
                            >
                                Status
                            </Button>
                        </Dropdown>

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

    const semesterRegistrationTableData: any = semesterRegistrationData?.data?.map((semesterRegItem) => ({
        key: semesterRegItem._id,
        academicSemester: `${semesterRegItem.academicSemester.name} (${semesterRegItem.academicSemester.year}) (${semesterRegItem.academicSemester.startMonth} - ${semesterRegItem.academicSemester.endMonth})`,
        status: semesterRegItem.status,
        startDate: moment(new Date(semesterRegItem.startDate)).format("MMM Do YYYY"),
        endDate: moment(new Date(semesterRegItem.endDate)).format("MMM Do YYYY"),
        minCredit: semesterRegItem.minCredit,
        maxCredit: semesterRegItem.maxCredit,
    }));

    const semesterRegistrationMetaData = semesterRegistrationData?.meta;

    if (isLoading) {
        return <Loading />;
    }

    const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
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
            <Table<TTableData>
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
                    pageSize={semesterRegistrationMetaData?.limit}
                    total={semesterRegistrationMetaData?.total}
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

export default SemesterRegistration;