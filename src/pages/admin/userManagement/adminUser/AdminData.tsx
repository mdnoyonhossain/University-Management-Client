import { Button, Popconfirm, Space, Table, TableColumnsType, TableProps, Input, Pagination } from "antd";
import { TAdmin, TQueryParam } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { useDeleteAdminMutation, useGetAllAdminsQuery } from "../../../../redux/features/admin/userManagementApi";
import { DeleteOutlined, InfoCircleOutlined, SearchOutlined, ReloadOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { toast } from "sonner";

type TTableData = Pick<TAdmin, "fullName" | "_id" | "id" | "gender" | "contactNo" | "email">;

const AdminData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [rollNoSearch, setRollNoSearch] = useState<string>("");  // State for roll number search
    const [page, setPage] = useState(1);

    const [deleteAdmin] = useDeleteAdminMutation();
    const { data: adminData, isLoading, isFetching } = useGetAllAdminsQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = adminData?.data?.map((item) => item[key]) || [];
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

    const handleDeleteAdmin = async (id: string) => {
        const toastId = toast.loading("Delete Admin...");
        try {
            const res = await deleteAdmin(id);

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
            title: "Admin Name",
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
                        <Link to={`/admin/admin-details-data/${item.key}`}>
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
                            title="Are you sure you want to delete this admin?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDeleteAdmin(item?._id)}
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

    const adminTableData = adminData?.data?.map((admin: TAdmin) => ({
        key: admin._id,
        fullName: admin.fullName,
        id: admin.id,
        _id: admin._id,
        gender: admin.gender,
        contactNo: admin.contactNo,
        email: admin.email
    }));

    const adminMetaData = adminData?.meta;

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
                style={{ marginBottom: 20, width: 200, borderRadius: '8px' }}
                placeholder="Search by Roll No."
            />
            {/* Search Button */}
            <Button
                onClick={handleRollNoSearch}
                type="primary"
                disabled={isLoading}
                style={{ marginBottom: 20, marginLeft: 10, borderRadius: '8px' }}
                icon={<SearchOutlined />}
            >
                Search
            </Button>

            {/* Reset Button */}
            <Button
                onClick={handleReset}
                type="default"
                loading={isLoading}
                style={{ marginBottom: 20, marginLeft: 10, borderRadius: '8px' }}
                icon={<ReloadOutlined />}
            >
                Reset
            </Button>

            {/* Table */}
            <Table<TTableData>
                loading={isFetching}
                columns={columns}
                dataSource={adminTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
                rowClassName="custom-table-row" // Custom row class for table
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={adminMetaData?.limit}
                    total={adminMetaData?.total}
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

export default AdminData;