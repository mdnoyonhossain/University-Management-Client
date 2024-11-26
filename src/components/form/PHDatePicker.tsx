import { Form, DatePicker } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
    disabled?: boolean;
    format?: string;
};

const PHDatePicker = ({ name, label, placeholder, style, disabled, format }: TPHDatePickerProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <DatePicker
                        {...field}
                        placeholder={placeholder}
                        style={style}
                        disabled={disabled}
                        format={format || "YYYY-MM-DD"}
                    />
                    {error && <span style={{ color: 'red', fontSize: '12px' }}>{error.message}</span>}
                </Form.Item>
            )}
        />
    );
};

export default PHDatePicker;
