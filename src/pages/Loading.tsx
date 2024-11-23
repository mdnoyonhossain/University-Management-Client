import { Skeleton, Table } from "antd";

const Loading = () => {
    const columns = [
        {
            title: "Column 1",
            dataIndex: "col1",
            key: "col1",
        },
        {
            title: "Column 2",
            dataIndex: "col2",
            key: "col2",
        },
        {
            title: "Column 3",
            dataIndex: "col3",
            key: "col3",
        },
    ];

    return (
        <Skeleton active paragraph={{ rows: 4 }}>
            <Table columns={columns} dataSource={[]} />
        </Skeleton>
    );
};

export default Loading;