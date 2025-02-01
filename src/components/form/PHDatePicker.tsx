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
    required?: boolean;
};

const PHDatePicker = ({ name, label, placeholder, style, disabled, format, required, }: TPHDatePickerProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={<span style={{fontWeight: "500"}}>{label}</span>}>
                    <DatePicker
                        {...field}
                        placeholder={placeholder}
                        style={style}
                        disabled={disabled}
                        format={format || "YYYY-MM-DD"}
                        required={required}
                    />
                    {error && <span style={{ color: 'red', fontSize: '12px' }}>{error.message}</span>}
                </Form.Item>
            )}
        />
    );
};

export default PHDatePicker;
