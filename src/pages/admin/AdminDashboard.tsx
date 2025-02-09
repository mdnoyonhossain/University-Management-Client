import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale } from "chart.js";
import { useGetMyProfileQuery } from "../../redux/features/admin/userManagementApi";
import Loading from "../Loading";
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale);

const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Student Enrollment",
            data: [50, 70, 40, 90, 100, 60],
            backgroundColor: "rgba(46, 125, 50, 0.7)",
            borderColor: "#2e7d32",
            borderWidth: 1,
        },
    ],
};

const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Monthly Revenue",
            data: [5000, 7000, 4000, 9000, 10000, 6000],
            borderColor: "#ff9800",
            backgroundColor: "rgba(255, 152, 0, 0.3)",
            fill: true,
            tension: 0.3,
        },
    ],
};

const AdminDashboard = () => {
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
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ color: "#2e7d32", fontSize: "25px" }}>Hi, {myProfileData?.data?.fullName}! Welcome to PH University Management System</h1>
            <p style={{ fontSize: "16px", color: "#555" }}>
                Your one-stop solution for managing academic and administrative tasks.
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
                <div style={{ width: "48%" }}>
                    <h2 style={{ color: "#2e7d32" }}>Student Enrollment Statistics</h2>
                    <Bar data={barChartData} options={{ responsive: true }} />
                </div>

                <div style={{ width: "48%" }}>
                    <h2 style={{ color: "#ff9800" }}>Revenue Trends</h2>
                    <Line data={lineChartData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;