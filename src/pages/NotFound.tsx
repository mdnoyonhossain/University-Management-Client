import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you are looking for does not exist."
                extra={
                    <Button type="primary">
                        <Link to="/">Back to Home</Link>
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;