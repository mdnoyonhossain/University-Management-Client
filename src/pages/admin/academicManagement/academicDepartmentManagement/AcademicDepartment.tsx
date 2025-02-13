import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment, TQueryParam } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">

const AcademicDepartment = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: academicDepartmentData, isLoading, isFetching } = useGetAllAcademicDepartmentsQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        if (key === "academicFaculty") {
            const values = academicDepartmentData?.data?.map((item) => item.academicFaculty.name) || [];
            return Array.from(new Set(values)).map((value) => ({
                text: value,
                value,
            }));
        }

        const values = academicDepartmentData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: value,
            value,
        }));
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Academic Department",
            key: "name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: getUniqueValues("name"),
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: "Academic Faculty",
            key: "academicFaculty",
            dataIndex: "academicFaculty",
            filters: getUniqueValues("academicFaculty"),
            ellipsis: true,
        }
    ];

    const academicDepartmentTableData = academicDepartmentData?.data?.map((academicDepartment) => ({
        key: academicDepartment._id,
        name: academicDepartment.name,
        academicFaculty: academicDepartment.academicFaculty.name
    }));

    const academicDepartmentMetaData = academicDepartmentData?.meta;

    if (isLoading) {
        return <Loading />;
    }

    const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    filters[key]?.forEach((value) => {
                        queryParams.push({
                            name: key,
                            value: key === "academicFaculty" ? academicDepartmentData?.data?.find(faculty => faculty.academicFaculty.name === value)?.academicFaculty._id : value,
                        });
                    });
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
                dataSource={academicDepartmentTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={academicDepartmentMetaData?.limit}
                    total={academicDepartmentMetaData?.total}
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

export default AcademicDepartment;