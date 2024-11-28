import { Button, Popconfirm, Space, Table, TableColumnsType, TableProps, Input } from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';


type TTableData = Pick<TStudent, "fullName" | "_id" | "id" | "gender" | "contactNo">;

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const [rollNoSearch, setRollNoSearch] = useState<string>("");  // State for roll number search
    const { data: studentData, isLoading, isFetching } = useGetAllStudentsQuery(params);

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
        setParams(undefined);
        setRollNoSearch("");
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Student Name",
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
            title: 'Actions',
            key: 'actions',
            render: () => {
                return (
                    <Space size="small">
                        <Button
                            icon={<EditOutlined />}
                            type="default"
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
                                style={{ backgroundColor: "#ff4d4f", color: "#fff", borderColor: "#ff4d4f" }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>

                        <Button
                            icon={<InfoCircleOutlined />}
                            type="default"
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

    const studentTableData = studentData?.data?.map((student) => ({
        key: student._id,
        fullName: student.fullName,
        id: student.id,
        _id: student._id,
        gender: student.gender,
        contactNo: student.contactNo
    }));

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
                pagination={{ responsive: true }}
            />
        </>
    );
};

export default StudentData;