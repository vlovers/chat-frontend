import React from 'react';

import {Link} from 'react-router-dom'
import { MailOutlined, LockOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Form, Input, Button, Typography } from "antd";


const RegisterForm = props => {

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        isValid,
        handleBlur,
        handleSubmit,
    } = props;
    const {Title} = Typography;

    return (
        <div className="login__wrap">

            <Title level={3}>Регистрация</Title>
            <Title level={5}>Для входа в чат, вам нужно зарегистрироватьс</Title>
            <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item
                // validateStatus={validateField("email", touched, errors)}
                help={!touched.email ? "" : errors.email}
                hasFeedback
                >
                <Input
                id="email"
                prefix={<MailOutlined />}
                size="large"
                placeholder="E-Mail"
                suffix={isValid ? <CheckCircleTwoTone /> : <ExclamationCircleTwoTone />}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item
                // validateStatus={validateField("email", touched, errors)}
                help={!touched.fullname ? "" : errors.fullname}
                hasFeedback
                >
                <Input
                id="fullname"
                prefix={<MailOutlined />}
                size="large"
                placeholder="Ваше имя и фамилия"
                suffix={isValid ? <CheckCircleTwoTone /> : <ExclamationCircleTwoTone />}
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item
                // validateStatus={validateField("email", touched, errors)}
                help={!touched.password ? "" : errors.password}
                hasFeedback>
                <Input
                id="password"
                prefix={<MailOutlined />}
                size="large"
                placeholder="Пароль"

                // suffix={isValid ? <CheckCircleTwoTone /> : <ExclamationCircleTwoTone />}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item
                // validateStatus={validateField("email", touched, errors)}
                help={!touched.password_2 ? "" : errors.password_2}
                hasFeedback
                >
                <Input
                id="password_2"
                prefix={<MailOutlined />}
                size="large"
                placeholder="Повторите пароль"


                suffix={isValid ? <CheckCircleTwoTone /> : <ExclamationCircleTwoTone />}
                value={values.password_2}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item>
                {isSubmitting && !isValid && <span>Ошибка!</span>}
                <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
                >
                    Зарегистрироваться
                </Button>
            </Form.Item>
                <Link className="auth__register-link" to="/signin">
                Войти в аккаунт
                </Link>
            </Form>

            {/* <Wrapper onSubmit={handleSubmit}>
                <ValidationTextField 
                    error={errors.email && touched.email ? true : false}
                    helperText={typeof(errors.email) === 'string' && touched.email ? errors.email : null}
                    className={classes.input}
                    id='email'
                    label="E-Mail"
                    type="email"
                    autoComplete="current-password"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"/>
                <ValidationTextField 
                    error={touched.fullname && errors.fullname ? true : false}
                    helperText={touched.fullname && errors.fullname}
                    className={classes.input}
                    value={values.fullname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="fullname"
                    label="Ваше имя"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"/>
                <ValidationTextField 
                    error={errors.password && touched.password ? true : false}
                    helperText={typeof(errors.password) === 'string' && touched.password ? errors.password : null}
                    className={classes.input}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="password"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"/>
                <ValidationTextField
                    error={errors.password_2 && touched.password_2 ? true : false}
                    helperText={errors.password_2}
                    value={values.password_2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.input}
                    id="password_2"
                    label="Повторить пароль"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"/>
                <Button 
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className={classes.button}>
                    Зарегистрироваться
                </Button>
                <RegisterLink>
                    <Link to='/signin'>
                        Войти в аккаунт
                    </Link>
                </RegisterLink>
            </Wrapper> */}

        </div>
    );
};

export default RegisterForm;

