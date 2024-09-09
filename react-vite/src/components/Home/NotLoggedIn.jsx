import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import styles from './NotLoggedIn.module.css';

const NotLoggedIn = () => {
  return (
    <div className={styles.notLoggedInContainer}>
      <h1 className={styles.welcomeHeader}>Welcome to Open Slot!</h1>
      <p className={styles.description}>
        Sign up or log in to start managing your business appointments today.
      </p>
      <div className={styles.authLinks}>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className={styles.authButton}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          className={styles.authButton}
        />
      </div>
    </div>
  );
};

export default NotLoggedIn;
