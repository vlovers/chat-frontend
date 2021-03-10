import { withFormik } from 'formik';

import RegisterForm from '../component';
import validateForm from '../../../utils/validate';
import { userActions } from "../../../redux/actions";
import axios from '../../../core/axios';
import store from "../../../redux/store";

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        fullname: '',
        password: ''
    }),
    
    validate: values => {
        let errors = {};
        validateForm({ isAuth: false, values, errors });
        return errors;
    },
  
    handleSubmit: (values, { setSubmitting, setStatus, props }) => {                
        return axios.post('/user/registration', values).then(({ data }) => {
            setTimeout(() => {
                props.history.push("/verify");
            }, 50);
        }).catch(({ data }) => {
            setStatus(data.status)
            setSubmitting(false)
        })
    },
  
    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);
