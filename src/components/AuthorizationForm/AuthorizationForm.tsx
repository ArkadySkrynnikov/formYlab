import {
    FunctionComponent,
    MouseEventHandler,
    ReactElement,
    useState,
} from "react";
import style from "./auth.module.css";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";

const AuthorizationForm: FunctionComponent = (): ReactElement => {
    const [state, setState] = useState<string>("login");

    const activeButton = style.form_button + " " + style.active;

    const handleClickLogin: MouseEventHandler<HTMLButtonElement> = () => {
        setState("login");
    };

    const handleClickRegister: MouseEventHandler<HTMLButtonElement> = () => {
        setState("register");
    };

    return (
        <>
            <div className={style.form_bg}>
                <div className={style.form_container}>
                    <div className={style.form_buttons_container}>
                        <button
                            onClick={handleClickLogin}
                            className={
                                state === "login"
                                    ? activeButton
                                    : style.form_button
                            }
                        >
                            Login
                        </button>
                        <button
                            onClick={handleClickRegister}
                            className={
                                state === "login"
                                    ? style.form_button
                                    : activeButton
                            }
                        >
                            Register
                        </button>
                    </div>
                    {state === "login" ? <Login /> : <Register />}
                </div>
            </div>
        </>
    );
};

export default AuthorizationForm;
