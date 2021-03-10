import React from 'react';
import {Link} from 'react-router-dom';

import {validateField} from '../../../utils';

import { MailOutlined, LockOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Form, Input, Button, Typography } from "antd";
import './index.css';

const LoginForm = props => {
    const { Title } = Typography;

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        isValid,
        handleBlur,
        handleSubmit,
        status
    } = props;
    
    
    return (
        <div className="login__wrap">
            <Title level={3}>Войти в аккаунт</Title>
            <Title level={5}>Пожалуйста, войдите в свой аккаунт</Title>
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
                // validateStatus={validateField("password", touched, errors)}
                help={!touched.password ? "" : errors.password}
                hasFeedback
             >
                <Input
                id="password"
                prefix={<LockOutlined />}
                size="large"
                type="password"
                placeholder="Пароль"
                value={values.password}
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
                    Войти в аккаунт
                </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signup">
                Зарегистрироваться
            </Link>
            </Form>
        </div>
    );
};

export default LoginForm;