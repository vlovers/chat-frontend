import { withFormik } from 'formik';
import LoginForm from '../component';

import validateForm from '../../../utils/validate';
import { userActions } from "../../../redux/actions";
import axios from '../../../core/axios';
import store from "../../../redux/store";

const LoginFormContainer = withFormik({
    mapPropsToValues: () => ({
        "email": '',
        "password": '',
    }),
    
    validate: values => {
        let errors = {};
        validateForm({ isAuth: true, values, errors });
        return errors;
    },
  
    handleSubmit: (values, { setSubmitting, setStatus, props }) => {        
        store.dispatch(userActions.fetchUserLogin(values)).then(({ status, confirmed }) => {
            if (status === "success" && confirmed) {
                setTimeout(() => {
                    props.history.push("/");
                }, 50);
            } else if(!confirmed){
                setTimeout(() => {
                    props.history.push("/verify");
                }, 50);
            }
            setSubmitting(false);
        });

        
        // return axios.post('/user/login', values).then(({ data }) => {
        //     localStorage.token = data.token
        //     setStatus(data.status)
        //     setSubmitting(false)
        // }).catch(({ data }) => {
        //     setStatus(data.status)
        //     setSubmitting(false)
        // })
    },
  
    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormContainer;