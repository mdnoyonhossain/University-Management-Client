import { Input } from "antd";
import { CSSProperties } from "react";
import { Controller } from "react-hook-form";

type PHInputProps = {
    type: string;
    name: string;
    placeholder?: string;
    style?: CSSProperties;
}

const PHInput = ({ type, name, placeholder, style }: PHInputProps) => {
    return (
        <Controller
            name={name}
            render={({ field }) => {
                if (type === "password") {
                    return (
                        <Input.Password
                            {...field}
                            placeholder={placeholder}
                            style={style}
                        />
                    );
                }
                return (
                    <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        style={style}
                    />
                )
            }}
        />
    );
};

export default PHInput;