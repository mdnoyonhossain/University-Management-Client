import { Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import academicDepartment from "../../../../assets/images/academic-department.avif";
import PHForm from '../../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from '../../../../schemas/academicManagement.schema';
import { FieldValues } from 'react-hook-form';
import { useCreateAcademicDepartmentMutation, useGetAllAcademicFacultiesQuery } from '../../../../redux/features/admin/academicManagementApi';
import { toast } from 'sonner';
import PHInput from '../../../../components/form/PHInput';
import PHSelect from '../../../../components/form/PHSelect';
import Loading from '../../../Loading';

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useCreateAcademicDepartmentMutation();
    const { data: facultiesData, isLoading, error } = useGetAllAcademicFacultiesQuery(undefined);

    const academicFacultyOptions = facultiesData?.data?.map((faculty: any) => ({
        value: faculty._id,
        label: faculty.name,
    })) || [];

    if (isLoading) {
        return <Loading />
    }

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Create Department...");

        const academicDepartmentData = {
            name: data.name,
            academicFaculty: data.academicFaculty
        }

        try {
            const res = await addAcademicDepartment(academicDepartmentData);
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
        <div
            style={{
                minHeight: '80vh',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Row
                gutter={[16, 16]}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '800px',
                    width: '100%',
                    height: "400px"
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src={academicDepartment}
                        alt="Logo"
                        style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0, 210, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7)',
                            marginBottom: '0px',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        Register Academic Department
                    </h2>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
                        <div style={{ marginBottom: '-35px' }}>
                            <PHInput
                                type="text"
                                name="name"
                                style={{ borderRadius: '8px' }}
                                placeholder="Academic Department Name"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect
                                name="academicFaculty"
                                options={academicFacultyOptions}
                                style={{ width: '100%' }}
                                placeholder="Select Academic Faculty"
                                disabled={isLoading || !!error}
                            />
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                }}
                            >
                                Create Department
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateAcademicDepartment;