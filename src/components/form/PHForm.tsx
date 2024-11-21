import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TPHFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
}

const PHForm = ({ children, onSubmit }: TPHFormProps) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;