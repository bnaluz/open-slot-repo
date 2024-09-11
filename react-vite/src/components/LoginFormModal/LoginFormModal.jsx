import { useState } from 'react';
import { thunkLogin } from '../../redux/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import styles from './LoginFormModal.module.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password';

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h1 className={styles.loginHeader}>Log In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <button className={styles.submitButton} type="submit">
          Log In
        </button>
        <button onClick={handleDemoLogin} className={styles.submitButton}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
