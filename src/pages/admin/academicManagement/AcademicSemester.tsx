import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

type TTableData = Pick<TAcademicSemester, "name" | "code" | "year" | "startMonth" | "endMonth">;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = semesterData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: value,
            value,
        }));
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Semester Name",
            key: "name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: getUniqueValues("name"),
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{text}</span>,
        },
        {
            title: "Semester Code",
            key: "code",
            dataIndex: "code",
            filters: getUniqueValues("code"),
            ellipsis: true,
            render: (text) => <span style={{ color: '#52c41a' }}>{text}</span>,
        },
        {
            title: "Semester Year",
            key: "year",
            dataIndex: "year",
            filters: getUniqueValues("year"),
            ellipsis: true,
            render: (text) => <span style={{ color: '#f58b00' }}>{text}</span>,
        },
        {
            title: "Start Month",
            key: "startMonth",
            dataIndex: "startMonth",
            filters: getUniqueValues("startMonth"),
            ellipsis: true,
            render: (text) => <span style={{ color: '#FF4D4F' }}>{text}</span>,
        },
        {
            title: "End Month",
            key: "endMonth",
            dataIndex: "endMonth",
            filters: getUniqueValues("endMonth"),
            ellipsis: true,
            render: (text) => <span style={{ color: '#52c41a' }}>{text}</span>,
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

    const semesterTableData = semesterData?.data?.map((semester) => ({
        key: semester._id,
        name: semester.name,
        code: semester.code,
        year: semester.year,
        startMonth: semester.startMonth,
        endMonth: semester.endMonth,
    }));

    const academicSemesterMetaData = semesterData?.meta;

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
                dataSource={semesterTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={academicSemesterMetaData?.limit}
                    total={academicSemesterMetaData?.total}
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

export default AcademicSemester;