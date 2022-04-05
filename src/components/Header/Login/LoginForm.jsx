import React, { useState, useContext } from "react";
import {AppContext} from '../../../context/context';
import {RequestApi} from '../../../api/api';

const LoginForm = (props) => {
    const context = useContext(AppContext);

    const [userInfoForm, setUserInfo] = useState({
        username: "",
        password: "",
        repeat_password: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserInfo({
            ...userInfoForm,
            [name]: value
        });

        setErrors(prevState => ({...prevState, base: null, [name]: null}));
    };

    const onBlur = (event) => {
        const {name} = event.target,
              errors = validateFileds(),
              error = errors[name];
    
        if (Object.keys(errors).length > 0) setErrors(prevState => ({...prevState, [name]: error}));
    };

    const validateFileds = () => {
        const errors = {};

        if(userInfoForm.username === '') {
            errors.username = 'Not empty';
        }
        if(userInfoForm.password.length < 5) {
            errors.password = 'Required! Must be 5 characters or more';
        }
        if(userInfoForm.repeat_password !== userInfoForm.password) {
            errors.repeat_password = 'Must be equal password';
        }

        return errors;
    };

    const onSubmit = async () => {
        try {
            setSubmitting(prevState => !prevState);
            const dataToken = await RequestApi.get('/authentication/token/new');
            const resultValidate = await RequestApi.post('/authentication/token/validate_with_login', {
                body: {
                    username: userInfoForm.username,
                    password: userInfoForm.password,
                    request_token: dataToken.request_token
                }
            });
            
            const {session_id} = await RequestApi.post('/authentication/session/new', {
                body: {
                    request_token: resultValidate.request_token
                }
            });

            const user = await  RequestApi.get('/account', {
                params: {session_id}
            });

            context.updateAuth(user, session_id);

        } catch(error) {
            setSubmitting(prevState => !prevState);
            setErrors({base: error.status_message});
        }
    };

    const onLogin = (event) => {
        event.preventDefault();
        const errors = validateFileds();
        if (Object.keys(errors).length > 0) {
            setErrors(prevState => ({...prevState, ...errors}));
        } else {
            onSubmit();
        }
    };

    return (
        <div className="form-login-container">
            <form className="form-login">
                <h1 className="h3 mb-3 font-weight-normal text-center">
                    Авторизация
                </h1>
                <div className="form-group mb-3">
                    <label htmlFor="username">Пользователь</label>
                    <input
                    type="text"
                    className={errors.username ? "form-control invalid": "form-control"}
                    id="username"
                    placeholder="Пользователь"
                    name="username"
                    value={userInfoForm.username}
                    onChange={onChange}
                    onBlur={onBlur}
                    />
                    {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                    )}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Пароль</label>
                    <input
                    type="password"
                    className={errors.password ? "form-control invalid": "form-control"}
                    id="password"
                    placeholder="Пароль"
                    name="password"
                    value={userInfoForm.password}
                    onChange={onChange}
                    onBlur={onBlur}
                    />
                    {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="repeat_password">Пароль</label>
                    <input
                    type="password"
                    className={errors.repeat_password ? "form-control invalid": "form-control"}
                    id="repeat_password"
                    placeholder="Повторить пароль"
                    name="repeat_password"
                    value={userInfoForm.repeat_password}
                    onChange={onChange}
                    onBlur={onBlur}
                    />
                    {errors.repeat_password && (
                    <div className="invalid-feedback">{errors.repeat_password}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    onClick={onLogin}
                    disabled={submitting}
                >
                    Вход
                </button>
                {errors.base && (
                    <div className="invalid-feedback text-center">{errors.base}</div>
                )}
            </form>
        </div>
    )
}

export default LoginForm;