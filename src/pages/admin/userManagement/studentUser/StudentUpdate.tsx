import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery, useUpdateStudentMutation } from "../../../../redux/features/admin/userManagementApi";
import { Form, Button, Card, Row, Col, Avatar, Tabs, Typography, Divider, Result, Upload } from "antd";
import { IdcardOutlined, MailOutlined, ReloadOutlined, TeamOutlined, UploadOutlined } from "@ant-design/icons";
import Loading from "../../../Loading";
import { toast } from "sonner";
import { Controller, FieldValues } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import { useGetAllAcademicDepartmentsQuery, useGetAllAcademicSemestersQuery } from "../../../../redux/features/admin/academicManagementApi";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const StudentUpdate = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const { data: studentData, isLoading, isError } = useGetSingleStudentQuery(studentId || "");
    const [updateStudent] = useUpdateStudentMutation();

    const { data: admissionSemesterData, isLoading: asIsLoading, error: asError } = useGetAllAcademicSemestersQuery(undefined);
    const { data: academicDepartmentData, isLoading: adIsLoading, error: adError } = useGetAllAcademicDepartmentsQuery(undefined);

    const admissionSemesterOptions = admissionSemesterData?.data?.map((admissionSemester: any) => ({
        value: admissionSemester._id,
        label: `${admissionSemester.name} (${admissionSemester.year}) - (${admissionSemester.startMonth} - ${admissionSemester.endMonth})`,
    })) || [];

    const academicDepartmentOptions = academicDepartmentData?.data?.map((academicDepartment: any) => ({
        value: academicDepartment._id,
        label: `${academicDepartment.name}`,
    })) || [];

    if (isLoading) {
        return <Loading />
    }

    if (isError || !studentData?.data) {
        return <Result
            status="error"
            title="Failed to Load Student"
            subTitle="Failed to load student details. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const student = studentData?.data;

    const handleStudentUpdate = async (data: FieldValues) => {
        const toastId = toast.loading("Student Updating...");

        const studentUpdateData = {
            id: studentData?.data?._id,
            data: {
                student: {
                    name: {
                        firstName: data.name.firstName,
                        middleName: data.name.middleName,
                        lastName: data.name.lastName,
                    },
                    gender: data.gender,
                    BloodGroup: data.BloodGroup,
                    profileImg: data.profileImg,
                    email: student?.email || data.email,
                    contactNo: student?.contactNo || data.contactNo,
                    emergencyContactNo: student?.emergencyContactNo || data.emergencyContactNo,
                    presentAddress: student?.presentAddress || data.presentAddress,
                    permanentAddress: student?.permanentAddress || data.permanentAddress,
                    guardian: {
                        fatherName: student?.guardian?.fatherName || data.fatherName,
                        fatherOccupation: student?.guardian?.fatherOccupation || data.fatherOccupation,
                        fatherContactNo: student?.guardian?.fatherContactNo || data.fatherContactNo,
                        motherName: student?.guardian?.motherName || data.motherName,
                        motherOccupation: student?.guardian?.motherOccupation || data.motherOccupation,
                        motherContactNo: student?.guardian?.motherContactNo || data.motherContactNo,
                    },
                    localGuardian: {
                        name: student?.localGuardian?.name || data.name,
                        occupation: student?.localGuardian?.occupation || data.occupation,
                        contactNo: student?.localGuardian?.contactNo || data.contactNo,
                        address: student?.localGuardian?.address || data.address,
                    },
                    // admissionSemester: admissionSemesterOptions.values && data.admissionSemester,
                    // academicDepartment: academicDepartmentOptions.values && data.academicDepartment
                }
            }
        }

        try {
            const res = await updateStudent(studentUpdateData);
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
        <div style={{ padding: "40px 20px", background: "#f4f4f4", minHeight: "100vh" }}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} lg={8}>
                    <Card
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <Avatar
                            size={120}
                            src={student?.profileImg || "https://via.placeholder.com/120"}
                            alt="Profile"
                            style={{ border: "2px solid #1890ff", marginBottom: "20px" }}
                        />
                        <Title level={4}>{student.fullName}</Title>
                        <Text type="secondary">
                            <IdcardOutlined style={{ marginRight: "8px" }} />
                            {student?.id}
                        </Text>
                        <Divider />
                        <Text style={{ display: "block", marginBottom: "10px" }}>
                            <MailOutlined style={{ marginRight: "5px" }} />
                            <strong>Email:</strong> {student?.email}
                        </Text>
                        <Text style={{ display: "block" }}>
                            <TeamOutlined style={{ marginRight: "8px" }} />
                            <strong>Gender:</strong> {student?.gender}
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} lg={16}>
                    <Card
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Personal Details" key="1">
                                <PHForm
                                    onSubmit={handleStudentUpdate}
                                    defaultValues={{
                                        "name.firstName": student?.name?.firstName,
                                        "name.middleName": student?.name?.middleName,
                                        "name.lastName": student?.name?.lastName,
                                        gender: student?.gender,
                                        BloodGroup: student?.BloodGroup,
                                        profileImg: student?.profileImg
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                                        <div style={{ flex: '1' }}>
                                            <PHInput
                                                type="text"
                                                label="First Name"
                                                name="name.firstName"
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <PHInput
                                                type="text"
                                                label="Middle Name"
                                                name="name.middleName"
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <PHInput
                                                type="text"
                                                label="Last Name"
                                                name="name.lastName"
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                                        <div style={{ flex: '1' }}>
                                            <PHSelect
                                                name="gender"
                                                options={genderOptions}
                                                style={{ width: '100%' }}
                                                label="Gender"
                                                placeholder="Select Gender (Male/Female/Other)"
                                            />
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <PHSelect
                                                name="BloodGroup"
                                                options={bloodGroupOptions}
                                                style={{ width: '100%' }}
                                                label="Blood Group"
                                                placeholder="Select Blood Group (Optional)"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <Controller
                                            name="profileImg"
                                            render={({ field: { onChange, value, ...field } }) => (
                                                <Form.Item>
                                                    <Upload.Dragger
                                                        {...field}
                                                        beforeUpload={(file) => {
                                                            onChange(file);
                                                            return false;
                                                        }}
                                                        fileList={value ? [value] : []}
                                                        onRemove={() => onChange(null)}
                                                    >
                                                        <p className="ant-upload-drag-icon">
                                                            <UploadOutlined />
                                                        </p>
                                                        <p className="ant-upload-text">Click or Drag Upload Profile Image</p>
                                                    </Upload.Dragger>
                                                </Form.Item>
                                            )}
                                        />
                                    </div>
                                    <Button type="primary" style={{ background: "black" }} htmlType="submit">
                                        Save Changes
                                    </Button>
                                </PHForm>
                            </TabPane>
                            <TabPane tab="Contact Info" key="2">
                                <PHForm
                                    onSubmit={handleStudentUpdate}
                                    defaultValues={{
                                        email: student?.email,
                                        contactNo: student?.contactNo,
                                        emergencyContactNo: student?.emergencyContactNo,
                                        presentAddress: student?.presentAddress,
                                        permanentAddress: student?.permanentAddress,
                                    }}
                                >
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Email"
                                            name="email"
                                            disabled={true}
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Contact No"
                                            name="contactNo"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Emergency Contact No"
                                            name="emergencyContactNo"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Present Address"
                                            name="presentAddress"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Permanent Address"
                                            name="permanentAddress"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <Button type="primary" style={{ background: "black" }} htmlType="submit">
                                        Save Changes
                                    </Button>
                                </PHForm>
                            </TabPane>
                            <TabPane tab="Guardian Info" key="3">
                                <PHForm
                                    onSubmit={handleStudentUpdate}
                                    defaultValues={{
                                        fatherName: student?.guardian?.fatherName,
                                        fatherOccupation: student?.guardian?.fatherOccupation,
                                        fatherContactNo: student?.guardian?.fatherContactNo,
                                        motherName: student?.guardian?.motherName,
                                        motherOccupation: student?.guardian?.motherOccupation,
                                        motherContactNo: student?.guardian?.motherContactNo,
                                    }}
                                >
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Father Name"
                                            name="guardian.fatherName"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Father Occupation"
                                            name="guardian.fatherOccupation"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="number"
                                            label="Father Contact No"
                                            name="guardian.fatherContactNo"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Mother Name"
                                            name="guardian.motherName"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Mother Occupation"
                                            name="guardian.motherOccupation"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="number"
                                            label="Mother Contact No"
                                            name="guardian.motherContactNo"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <Button type="primary" style={{ background: "black" }} htmlType="submit">
                                        Save Changes
                                    </Button>
                                </PHForm>
                            </TabPane>
                            <TabPane tab="Local Guardian Info" key="4">
                                <PHForm
                                    onSubmit={handleStudentUpdate}
                                    defaultValues={{
                                        name: student?.localGuardian?.name,
                                        occupation: student?.localGuardian?.occupation,
                                        contactNo: student?.localGuardian?.contactNo,
                                        address: student?.localGuardian?.address,
                                    }}
                                >
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Name"
                                            name="name"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Occupation"
                                            name="occupation"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="number"
                                            label="Contact No"
                                            name="contactNo"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <PHInput
                                            type="text"
                                            label="Address"
                                            name="address"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    <Button type="primary" style={{ background: "black" }} htmlType="submit">
                                        Save Changes
                                    </Button>
                                </PHForm>
                            </TabPane>
                            <TabPane tab="Academic Info" key="5">
                                <PHForm
                                    onSubmit={handleStudentUpdate}
                                    defaultValues={{
                                        admissionSemester: `${student?.admissionSemester?.name} (${student?.admissionSemester?.year}) - (${student?.admissionSemester?.startMonth} - ${student?.admissionSemester?.endMonth})`,
                                        academicDepartment: student?.academicDepartment?.name
                                    }}
                                >
                                    <div>
                                        <PHSelect
                                            name="admissionSemester"
                                            options={admissionSemesterOptions}
                                            style={{ width: '100%' }}
                                            label="Admission Semester"
                                            placeholder="Select your admission semester"
                                            disabled={asIsLoading || !!asError}
                                        />
                                    </div>
                                    <div>
                                        <PHSelect
                                            name="academicDepartment"
                                            options={academicDepartmentOptions}
                                            style={{ width: '100%' }}
                                            label="Academic Department"
                                            placeholder="Select your academic department"
                                            disabled={adIsLoading || !!adError}
                                        />
                                    </div>
                                    <Button type="primary" style={{ background: "black" }} htmlType="submit">
                                        Save Changes
                                    </Button>
                                </PHForm>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentUpdate;