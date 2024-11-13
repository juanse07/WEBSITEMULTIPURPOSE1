import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import FormInputField from "./FormInputField";
import { ComponentProps, useState } from "react";
import { Button, Form, FormControlProps } from "react-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface PasswordInputFieldProps {
    register: UseFormRegisterReturn,
    label?: string,
    error?: FieldError,

}

export default function PasswordInputField({register,label, error, ...props}: PasswordInputFieldProps & FormControlProps & ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  let showPasswordIcon = showPassword ? "eye-slash" : "eye";

    return (
        <FormInputField
            register={register}
            label={label}
            error={error}
            type={showPassword ? "text" : "password"}
            {...props}
            inputGroupElement={
                <Button
                id={register.name + "-toggle- visibility-button"}>

                    {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
                </Button>
            }
        />
    )
}