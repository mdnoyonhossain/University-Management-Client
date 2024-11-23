import { Form, Input } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type TPHInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
}

const PHInput = ({ type, name, placeholder, style, label }: TPHInputProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => {
                if (type === "password") {
                    return (
                        <Form.Item label={label}>
                            <Input.Password
                                {...field}
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