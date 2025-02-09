import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetMyProfileQuery } from '../../redux/features/admin/userManagementApi';
import Loading from '../Loading';
import { Button, Result } from 'antd';
import { ReloadOutlined } from "@ant-design/icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
    const data = {
        labels: ['Math', 'Science', 'History', 'English', 'Computer Science'],
        datasets: [
            {
                label: 'Marks Obtained',
                data: [85, 90, 78, 88, 95],
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Student Performance Overview',
            },
        },
    };

    const { data: myProfileData, isLoading, isError } = useGetMyProfileQuery(undefined);

    if (isLoading) {
        return <Loading />
    }

    if (isError || !myProfileData?.data) {
        return <Result
            status="error"
            title="Failed to Load Profile Data Details"
            subTitle="Sorry, we are unable to load the Profile Data details at the moment. Please try again later."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} icon={<ReloadOutlined />}>
                    Retry
                </Button>
            }
        />
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ color: "#2e7d32", fontSize: "25px" }}>Hi, {myProfileData?.data?.fullName}! Welcome to PH University Management System</h1>
            <p style={{ fontSize: "16px", color: "#555" }}>
                Your one-stop solution for managing academic and administrative tasks.
            </p>
            <div style={{ width: '600px', margin: 'auto' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default StudentDashboard;
