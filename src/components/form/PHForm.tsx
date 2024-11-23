import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    resolver?: any
}

type TPHFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const PHForm = ({ children, onSubmit, resolver }: TPHFormProps) => {
    const formConfig: TFormConfig = {};

    if (resolver) {
        formConfig['resolver'] = resolver;
    }

    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;