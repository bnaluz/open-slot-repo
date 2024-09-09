import { Link } from 'react-router-dom';
import styles from './BusinessCard.module.css';

const BusinessCard = ({
  id,
  address,
  city,
  description,
  image_url,
  name,
  state,
}) => {
  return (
    <div className={styles.businessCard}>
      <Link key={id} to={`/business/${id}`} className={styles.businessCardLink}>
        <img src={image_url} alt={name} className={styles.businessCardImage} />
        <div className={styles.businessCardContent}>
          <h3 className={styles.businessCardTitle}>{name}</h3>
          <p className={styles.businessCardDescription}>{description}</p>
          <div className={styles.businessCardLocation}>
            <p>{address}</p>
            <p>
              {city}, {state}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BusinessCard;
