import { Form, Input } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type TPHInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
    required?: any;
}

const PHInput = ({ type, name, placeholder, style, label, required }: TPHInputProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => {
                if (type === "password") {
                    return (
                        <Form.Item label={label}>
                            <Input.Password
                                {...field}
                                required={required}
                                placeholder={placeholder}
                                style={style}
                            />
                            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error.message}</span>}
                        </Form.Item>
                    );
                }
                return (
                    <Form.Item label={label}>
                        <Input
                            {...field}
                            type={type}
                            required={required}
                            placeholder={placeholder}
                            style={style}
                        />
                        {error && <span style={{ color: 'red', fontSize: '12px' }}>{error.message}</span>}
                    </Form.Item>
                )
            }}
        />
    );
};

export default PHInput;