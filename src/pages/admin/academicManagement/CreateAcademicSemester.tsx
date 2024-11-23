import { Button, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import banner from "../../../assets/images/banner.avif";
import createSemester from "../../../assets/images/create-semester.jpg";
import PHForm from '../../../components/form/PHForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHSelect from '../../../components/form/PHSelect';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: String(currentYear + number),
    label: String(currentYear + number)
}));

const CreateAcademicSemester = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const name = semesterOptions[Number(data.name) - 1]?.label;
        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }
        console.log(semesterData);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
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
                    maxWidth: '1000px',
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

                <Col xs={24} sm={24} md={12} lg={12}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '24px',
                            marginBottom: '20px',
                            fontFamily: 'revert',
                        }}
                    >
                        PH University Log In
                    </h2>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="name" options={semesterOptions} style={{ width: '100%' }} placeholder="Select Semester Name" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="year" options={yearOptions} style={{ width: '100%' }} placeholder="Select Semester Year" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="startMonth" options={monthOptions} style={{ width: '100%' }} placeholder="Select Semester Start Month" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <PHSelect name="endMonth" options={monthOptions} style={{ width: '100%' }} placeholder="Select Semester End Month" />
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
                                Register Semester
                            </Button>
                        </div>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateAcademicSemester;
