import { SubmitHandler, useForm } from "react-hook-form";
import style from "./login.module.scss";
import classNames from "classnames";

interface Login {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Login>({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Login> = (data) => {
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
                        </div>
                    }
                </form>
            </div>
        </>
    );
};

export default Login;
