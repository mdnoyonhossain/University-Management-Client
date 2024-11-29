import { Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import academicFaculty from "../../../../assets/images/academic-faculty.jpg";
import PHForm from '../../../../components/form/PHForm';
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from '../../../../schemas/academicManagement.schema';
import { FieldValues } from 'react-hook-form';
import { useCreateAcademicFacultyMutation } from '../../../../redux/features/admin/academicManagementApi';
import { toast } from 'sonner';
import PHInput from '../../../../components/form/PHInput';

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useCreateAcademicFacultyMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Create Faculty...");

        const academicFacultyData = {
            name: data.name
        }

        try {
            const res = await addAcademicFaculty(academicFacultyData);
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
                        src={academicFaculty}
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
                            marginBottom: '30px',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        Register Academic Faculty
                    </h2>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="text"
                                name="name"
                                style={{ borderRadius: '8px' }}
                                placeholder="Academic Faculty Name"
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
                                Create Facaulty
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateAcademicFaculty;