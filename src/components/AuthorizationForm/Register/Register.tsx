import { SubmitHandler, useForm } from "react-hook-form";
import style from "../Login/login.module.scss";
import classNames from "classnames";

interface Register {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<Register>({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Register> = (data) => {
        reset();
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className={style.form_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <label htmlFor={"email"} className={style.label_text}>
                        Email:
                    </label>
                    <input
                        className={classNames(style.input, {
                            [style.errorInput]: errors.email,
                        })}
                        placeholder={"Enter your email"}
                        type={"email"}
                        {...register("email", {
                            required: "Enter email",
                            minLength: 6,
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <label htmlFor={"password"} className={style.label_text}>
                        Password:
                    </label>
                    <input
                        className={classNames(style.input, {
                            [style.errorInput]: errors.password,
                        })}
                        placeholder={"Enter your password"}
                        type={"password"}
                        {...register("password", {
                            required: "Enter password",
                            minLength: 6,
                        })}
                    />
                    <label
                        htmlFor={"confirmPassword"}
                        className={style.label_text}
                    >
                        Confirm your password:
                    </label>
                    <input
                        className={classNames(style.input, {
                            [style.errorInput]: errors.confirmPassword,
                        })}
                        placeholder={"Enter your password"}
                        type={"password"}
                        {...register("confirmPassword", {
                            required: "Enter password",
                            minLength: 6,
                            validate: (value) => {
                                if (watch("password") != value) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                    />
                    <input
                        type={"submit"}
                        className={style.input_submit}
                        value={"Submit"}
                    />
                    {
                        <div className={style.errorMessage_container}>
                            <span className={style.errorMessage}>
                                {errors.email?.message}
                            </span>
                            <span className={style.errorMessage}>
                                {errors.password?.message}
                            </span>
                            <span className={style.errorMessage}>
                                {errors.confirmPassword?.message}
                            </span>
                        </div>
                    }
                </form>
            </div>
        </>
    );
};

export default Register;
