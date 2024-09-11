import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { Link } from 'react-router-dom';
import styles from './LoggedIn.module.css';

const FeatureComingSoon = () => {
  return (
    <div className={styles.comingSoonModal}>
      <h2>Feature Coming Soon</h2>
      <p>We are working hard to bring this feature to you soon!</p>
    </div>
  );
};

const LoggedIn = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className={styles.loggedInContainer}>
      <h1>Welcome back, {user.username}!</h1>
      <p>
        {`We're glad to have you here. You can manage your businesses and services
        below.`}
      </p>
      <div className={styles.buttonGrid}>
        <Link to="/business/all" className={styles.dashboardLink}>
          Explore All Businesses
        </Link>
        <Link to="/business/create" className={styles.dashboardLink}>
          Add Your Business
        </Link>
        <OpenModalButton
          buttonText="Manage Your Appointments"
          modalComponent={<FeatureComingSoon />}
          className={styles.dashboardButton}
        />
        <OpenModalButton
          buttonText="Manage Your Businesses"
          modalComponent={<FeatureComingSoon />}
          className={styles.dashboardButton}
        />
      </div>
    </div>
  );
};

export default LoggedIn;
