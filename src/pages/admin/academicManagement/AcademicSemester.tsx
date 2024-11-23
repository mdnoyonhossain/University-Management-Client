import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const AcademicSemester = () => {
    const { data: semesterData } = useGetAllSemestersQuery(undefined);

    const semesterTableData = semesterData?.data?.map(semester => ({
        _id: semester._id,
        name: semester.name,
        code: semester.code,
        year: semester.year,
        startMonth: semester.startMonth,
        endMonth: semester.endMonth
    }));

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Semester Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Semester Code',
            dataIndex: 'code'
        },
        {
            title: 'Semester Year',
            dataIndex: 'year'
        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth'
        },
        {
            title: 'End Month',
            dataIndex: 'endMonth'
        }
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div style={{ background: "green" }}>
            <Table<DataType>
                columns={columns}
                dataSource={semesterTableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div>
    );
};

export default AcademicSemester;