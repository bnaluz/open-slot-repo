import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            exact
            to="/"
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            <img src={'/logo.png'} alt="Logo" className={styles.logo} />
          </NavLink>
        </li>
      </ul>
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
