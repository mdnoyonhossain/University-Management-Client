import { Form, Select } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
    options: { value: string, label: string }[];
    disabled?: any;
    mode?: "multiple" | undefined;
}

const PHSelect = ({ name, label, placeholder, style, options, disabled, mode }: TPHSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        {...field}
                        mode={mode}
                        placeholder={placeholder}
                        style={style}
                        options={options}
                        disabled={disabled}
                    />
                    {error && <span style={{ color: 'red', fontSize: '12px' }}>{error.message}</span>}
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;