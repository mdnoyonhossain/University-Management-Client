import { Form, Select } from "antd";
import { CSSProperties, useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
    options: { value: string, label: string }[];
    disabled?: any;
    mode?: "multiple" | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
}

const PHSelectWithWatch = ({ name, label, placeholder, style, options, disabled, mode, onValueChange }: TPHSelectProps) => {
    const method = useFormContext();
    const inputValue = useWatch({
        control: method.control,
        name,
    });
    
    useEffect(() => {
        onValueChange(inputValue);
    }, [inputValue]);
    
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={<span style={{fontWeight: "500"}}>{label}</span>}>
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

export default PHSelectWithWatch;