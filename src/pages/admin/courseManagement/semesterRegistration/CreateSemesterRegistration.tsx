import { Button, Row, Col, Result } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../../assets/images/banner.avif";
import createSemester from "../../../../assets/images/semeser-registration.jpg";
import PHForm from '../../../../components/form/PHForm';
import PHSelect from '../../../../components/form/PHSelect';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useGetAllAcademicSemestersQuery } from '../../../../redux/features/admin/academicManagementApi';
import { semesterStatusOptions } from '../../../../constants/semester';
import PHDatePicker from '../../../../components/form/PHDatePicker';
import PHInput from '../../../../components/form/PHInput';
import { useCreateRegistrationSemesterMutation } from '../../../../redux/features/admin/courseManagement';
import { ReloadOutlined } from "@ant-design/icons";
import Loading from '../../../Loading';

const CreateSemesterRegistration = () => {
    const { data: academicSemester, isLoading, isError } = useGetAllAcademicSemestersQuery([{ name: "sort", value: "year" }]);
    const [createRegistrationSemester] = useCreateRegistrationSemesterMutation();

    const academicSemesterOptions = academicSemester?.data?.map((academicSemesterItem: any) => ({
        value: academicSemesterItem._id,
        label: `${academicSemesterItem.name} (${academicSemesterItem.year}) - (${academicSemesterItem.startMonth} - ${academicSemesterItem.endMonth})`,
    })) || [];

    if (isLoading) {
        return <Loading />
    }

    if (isError || !academicSemester?.data) {
        return <Result
            status="error"
            title="Failed to Load Academic Semester"
            subTitle="Sorry, we are unable to load the Academic Semester details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Registration Semester...");

        const registrationSemesterData = {
            academicSemester: data.academicSemester,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit)
        }
        console.log(registrationSemesterData);

        try {
            const res = await createRegistrationSemester(registrationSemesterData);

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
                {/* Left Column: Image */}
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <img
                        src={createSemester}
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
                        Semester Registration
                    </h2>
                    <PHForm onSubmit={onSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="academicSemester" options={academicSemesterOptions} style={{ width: '100%' }} placeholder="Select Semester Name" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="status" options={semesterStatusOptions} style={{ width: '100%' }} placeholder="Select Registration Semester Status" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHDatePicker
                                name="startDate"
                                // required
                                style={{ borderRadius: '8px', width: "100%" }}
                                placeholder="Select Registration Semester Start Date"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHDatePicker
                                name="endDate"
                                required
                                style={{ borderRadius: '8px', width: "100%" }}
                                placeholder="Select Registration Semester End Date"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="number"
                                name="minCredit"
                                required={true}
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Registration Semester minCredit"
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHInput
                                type="number"
                                required={true}
                                name="maxCredit"
                                style={{ borderRadius: '8px' }}
                                placeholder="Enter Registration Semester maxCredit"
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
                                Semester Registration
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateSemesterRegistration;