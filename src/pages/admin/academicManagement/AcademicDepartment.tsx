import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment, TQueryParam } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";

type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">

const AcademicDepartment = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const { data: academicDepartmentData, isLoading, isFetching } = useGetAllAcademicDepartmentsQuery(params);

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
        <Table<TTableData>
            loading={isFetching}
            columns={columns}
            dataSource={academicDepartmentTableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
            scroll={{ x: "max-content" }}
            pagination={{ responsive: true }}
        />
    );
};

export default AcademicDepartment;