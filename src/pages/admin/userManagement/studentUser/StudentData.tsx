import { Button, Popconfirm, Space, Table, TableColumnsType, TableProps, Input, Pagination } from "antd";
import { TQueryParam, TStudent } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { useDeleteStudentMutation, useGetAllStudentsQuery } from "../../../../redux/features/admin/userManagementApi";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined, ReloadOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { toast } from "sonner";

type TTableData = Pick<TStudent, "fullName" | "_id" | "id" | "gender" | "contactNo" | "email">;

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [rollNoSearch, setRollNoSearch] = useState<string>("");
    const [page, setPage] = useState(1);

    const [deleteStudent] = useDeleteStudentMutation();
    const { data: studentData, isLoading, isFetching } = useGetAllStudentsQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = studentData?.data?.map((item) => item[key]) || [];
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

    const handleDeleteStudent = async (id: string) => {
        const toastId = toast.loading("Delete Student...");
        try {
            const res = await deleteStudent(id);

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

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Student Name",
            key: "fullName",
            dataIndex: "fullName",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>, // Style for Admin Name
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
            render: (item) => {
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

                        <Link to={`/admin/student-details-data/${item.key}`}>
                            <Button
                                icon={<InfoCircleOutlined />}
                                type="default"
                                size="small"
                                style={{ backgroundColor: "#52c41a", color: "#fff", borderColor: "#52c41a" }}
                            >
                                Details
                            </Button>
                        </Link>
                        <Popconfirm
                            title="Are you sure you want to delete this student?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDeleteStudent(item?._id)}
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

    const studentTableData = studentData?.data?.map((student: TStudent) => ({
        key: student._id,
        fullName: student.fullName,
        id: student.id,
        _id: student._id,
        gender: student.gender,
        contactNo: student.contactNo,
        email: student.email
    }));

    const studentMetaData = studentData?.meta;

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

export default StudentData;
