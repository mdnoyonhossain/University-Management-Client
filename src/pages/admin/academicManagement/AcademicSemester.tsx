import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";
import Loading from "../../Loading";

type TTableData = Pick<TAcademicSemester, "name" | "code" | "year" | "startMonth" | "endMonth">;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params);

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
        },
        {
            title: "Semester Code",
            key: "code",
            dataIndex: "code",
            filters: getUniqueValues("code"),
        },
        {
            title: "Semester Year",
            key: "year",
            dataIndex: "year",
            filters: getUniqueValues("year"),
        },
        {
            title: "Start Month",
            key: "startMonth",
            dataIndex: "startMonth",
            filters: getUniqueValues("startMonth"),
        },
        {
            title: "End Month",
            key: "endMonth",
            dataIndex: "endMonth",
            filters: getUniqueValues("endMonth"),
        },
    ];

    const semesterTableData = semesterData?.data?.map((semester) => ({
        key: semester._id,
        name: semester.name,
        code: semester.code,
        year: semester.year,
        startMonth: semester.startMonth,
        endMonth: semester.endMonth,
    }));

    if (isLoading) {
        return <Loading />
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
            dataSource={semesterTableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
        />
    );
};

export default AcademicSemester;