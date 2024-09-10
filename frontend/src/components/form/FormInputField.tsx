import { ComponentProps } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import { Field, FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
    register: UseFormRegisterReturn;
    label?: string;
    error?: FieldError;
}
export default function FormInputField({register, label, error, ...props}: FormInputFieldProps & FormControlProps & ComponentProps<"input">){
    return(
        <div>
          <Form.Group className="mb-3" controlId={register.name +"-input"}>
            { label && <Form.Label>{label}</Form.Label>}
            <Form.Control 
            {...register}
            {...props}
            isInvalid={!!error}
            placeholder={"Enter "+label} /> 
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
    );

}