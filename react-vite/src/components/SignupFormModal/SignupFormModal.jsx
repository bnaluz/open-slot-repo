import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSignup } from '../../redux/session';
import styles from './SignupFormModal.module.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name: firstname,
        last_name: lastname,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className={styles.signupFormContainer}>
      <h1 className={styles.signupHeader}>Sign Up</h1>
      {errors.server && <p className={styles.error}>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          First Name
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}
        <label className={styles.label}>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <label className={styles.label}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.username && <p className={styles.error}>{errors.username}</p>}
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
