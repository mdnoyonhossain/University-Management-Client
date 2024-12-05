import { Button, Col, Modal, Pagination, Popconfirm, Result, Row, Space, Table, TableColumnsType, TableProps } from "antd";
import { TCourse, TFaculty, TQueryParam } from "../../../../types";
import { useState } from "react";
import Loading from "../../../Loading";
import { ArrowRightOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, UserAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { useGetAllCoursesQuery, useUpdateAddAssignFacultiesMutation } from "../../../../redux/features/admin/courseManagement";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import assignFacultiesImg from "../../../../assets/images/academic-department.avif";
import { useGetAllFacultiesQuery } from "../../../../redux/features/admin/userManagementApi";
import { addAssignFaculties } from "../../../../schemas/courseManagement";

type TTableData = Pick<TCourse, "title" | "prefix" | "code" | "credits" | "preRequisiteCourses">;

const Courses = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: allCoursesData, isLoading, isFetching } = useGetAllCoursesQuery([
        { name: "limit", value: 6 },
        { name: "page", value: page },
        { name: "sort", value: "code" },
        ...params
    ]);

    const getUniqueValues = (key: keyof TTableData) => {
        const values = allCoursesData?.data?.map((item) => item[key]) || [];
        return Array.from(new Set(values)).map((value) => ({
            text: typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value),
            value: typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value),
        }));
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Course Title",
            key: "title",
            dataIndex: "title",
            showSorterTooltip: { target: "full-header" },
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: "Course Prefix",
            key: "prefix",
            dataIndex: "prefix",
            filters: getUniqueValues("prefix"),
            ellipsis: true,
        },
        {
            title: "Course Code",
            key: "code",
            dataIndex: "code",
            ellipsis: true,
        },
        {
            title: "Course Credits",
            key: "credits",
            dataIndex: "credits",
            filters: getUniqueValues("credits"),
            ellipsis: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return (
                    <Space size="small">
                        <AssignFaculties facultyData={item} />

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

    const courseTableData: any = allCoursesData?.data?.map((courseItem) => ({
        key: courseItem._id,
        title: `${courseItem.title} (Code-${courseItem.code})`,
        prefix: courseItem.prefix,
        code: courseItem.code,
        credits: courseItem.credits,
    }));

    const semesterRegistrationMetaData = allCoursesData?.meta;

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
            <Table<TTableData>
                loading={isFetching}
                columns={columns}
                dataSource={courseTableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
                scroll={{ x: "max-content" }}
                pagination={false}
            />

            {/* Custom Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Pagination
                    current={page}
                    pageSize={semesterRegistrationMetaData?.limit}
                    total={semesterRegistrationMetaData?.total}
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


const AssignFaculties = ({ facultyData }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: faculteisData, isLoading, isError, isFetching } = useGetAllFacultiesQuery(undefined);
    const [updateAddAssignFaculties] = useUpdateAddAssignFacultiesMutation();

    const facultiesOptions = faculteisData?.data?.map((faculty: TFaculty) => ({
        value: faculty._id,
        label: faculty.fullName,
    })) || [];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <Loading />
    }

    if (isError || !faculteisData?.data) {
        return <Result
            status="error"
            title="Failed to Load Courses"
            subTitle="Sorry, we are unable to load the All Faculties details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Add Assign Faculties...");

        const assignFacultiesData = {
            id: facultyData.key,
            data: {
                faculties: data.faculties
            }
        }

        try {
            const res = await updateAddAssignFaculties(assignFacultiesData);
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

    return (
        <>
            <Button
                onClick={showModal}
                icon={<UserAddOutlined />}
                type="default"
                size="small"
                style={{ backgroundColor: "green", color: "#fff" }}
            >
                Assign Faculties
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <Row
                        gutter={[16, 16]}>
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <img
                                src={assignFacultiesImg}
                                alt="Logo"
                                style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                                    marginBottom: '15px',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                Assign Faculties
                            </h2>
                            <PHForm onSubmit={onSubmit} resolver={zodResolver(addAssignFaculties)}>
                                <div style={{ marginBottom: '15px' }}>
                                    <PHSelect
                                        name="faculties"
                                        mode="multiple"
                                        options={facultiesOptions}
                                        style={{ width: '100%' }}
                                        placeholder="Select Assign Faculties"
                                        disabled={isLoading || isFetching}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        icon={<UserAddOutlined />}
                                        style={{
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            background: "green"
                                        }}
                                    >
                                        Add Faculties
                                    </Button>
                                </div>
                            </PHForm>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
};

export default Courses;