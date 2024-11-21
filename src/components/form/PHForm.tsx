import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type PHFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
}

const PHForm = ({ children, onSubmit }: PHFormProps) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default PHForm;