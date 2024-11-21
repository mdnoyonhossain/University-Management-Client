import { Form, Select } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
    options: { value: string, label: string }[];
}

const PHSelect = ({ name, label, placeholder, style, options }: TPHSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field }) => (
                <Form.Item label={label}>
                    <Select
                        {...field}
                        placeholder={placeholder}
                        style={style}
                        options={options}
                    />
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;