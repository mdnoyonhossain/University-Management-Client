import { Button, Popconfirm, Space, Table, TableColumnsType, TableProps, Input, Pagination } from "antd";
import { TFaculty, TQueryParam } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined, ReloadOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';


type TTableData = Pick<TFaculty, "fullName" | "_id" | "id" | "gender" | "contactNo" | "email">;

const FacultyData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [rollNoSearch, setRollNoSearch] = useState<string>("");  // State for roll number search
    const [page, setPage] = useState(1);

    const { data: facultyData, isLoading, isFetching } = useGetAllFacultiesQuery([
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = facultyData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: value,
            value,
        }));
    };

    const handleRollNoSearch = () => {
        const queryParams: TQueryParam[] = [];
        if (rollNoSearch) {
            queryParams.push({ name: "id", value: rollNoSearch });
        }
        setParams(queryParams);
    };

    const handleReset = () => {
        setParams([]);
        setPage(1);
        setRollNoSearch("");
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Faculty Name",
            key: "fullName",
            dataIndex: "fullName",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
        },
        {
            title: "Roll No.",
            key: "id",
            dataIndex: "id",
            ellipsis: true,
        },
        {
            title: "Gender",
            key: "gender",
            dataIndex: "gender",
            filters: getUniqueValues("gender"),
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
            filters: getUniqueValues("email"),
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

    const facultyTableData = facultyData?.data?.map((faculty: TFaculty) => ({
        key: faculty._id,
        fullName: faculty.fullName,
        id: faculty.id,
        _id: faculty._id,
        gender: faculty.gender,
        contactNo: faculty.contactNo,
        email: faculty.email
    }));

    const facultyMetaData = facultyData?.meta;

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
            {/* Search Input for Roll No. */}
            <Input
                value={rollNoSearch}
                onChange={(e) => setRollNoSearch(e.target.value)}  // Update state as user types
                style={{ marginBottom: 20, width: 200 }}
                placeholder="Search by Roll No."
            />
            {/* Search Button */}
            <Button
                onClick={handleRollNoSearch}
                type="primary"
                disabled={isLoading}
                style={{ marginBottom: 20, marginLeft: 10 }}
                icon={<SearchOutlined />}
            >
                Search
            </Button>

            {/* Reset Button */}
            <Button
                onClick={handleReset}
                type="default"
                loading={isLoading}
                style={{ marginBottom: 20, marginLeft: 10 }}
                icon={<ReloadOutlined />}
            >
                Reset
            </Button>

            {/* Table */}
            <Table<TTableData>
                loading={isFetching}
                columns={columns}
                dataSource={facultyTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={facultyMetaData?.limit}
                    total={facultyMetaData?.total}
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

export default FacultyData;