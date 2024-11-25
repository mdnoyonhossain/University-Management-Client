import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicFaculty, TQueryParam } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";

type TTableData = Pick<TAcademicFaculty, "name">

const AcademicFaculty = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const { data: academicFacultyData, isLoading, isFetching } = useGetAllAcademicFacultiesQuery(params);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = academicFacultyData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: value,
            value,
        }));
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Academic Faculty Name",
            key: "name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: getUniqueValues("name"),
            ellipsis: true,
        }
    ];

    const academicFacultyTableData = academicFacultyData?.data?.map((academicFaculty) => ({
        key: academicFaculty._id,
        name: academicFaculty.name
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
        <Table<TTableData>
            loading={isFetching}
            columns={columns}
            dataSource={academicFacultyTableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
            scroll={{ x: "max-content" }}
            pagination={{ responsive: true }}
        />
    );
};

export default AcademicFaculty;