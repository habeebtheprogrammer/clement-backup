import axios from 'axios';
import processLogin from '../utils/processLogin';

const loginAction = userData => dispatch =>
  axios.post('/api/auth/login', userData).then((response) => {
    if (!response.data.tfa) {
      processLogin(response.data.token, dispatch);
    }
    return { tfa: response.data.tfa, status: true };
  }, () => false);

export const login2fa = userData => dispatch =>
  axios.post('/api/auth/login-2fa', userData).then((response) => {
    processLogin(response.data.token, dispatch);
    return true;
  }, () => false);

export default loginAction;
