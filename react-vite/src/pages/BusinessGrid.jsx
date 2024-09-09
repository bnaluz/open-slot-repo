import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBusinesses } from '../redux/business';
import BusinessCard from '../components/Business/BusinessCard';
import styles from './BusinessGrid.module.css';

const BusinessGrid = () => {
  const dispatch = useDispatch();
  const allBusinesses = useSelector((state) =>
    Object.values(state.business.allBusinesses)
  );

  useEffect(() => {
    dispatch(fetchAllBusinesses());
  }, [dispatch]);

  return (
    <div className={styles.gridContainer}>
      {allBusinesses.map((business) => {
        return (
          <BusinessCard
            key={business.id}
            id={business.id}
            address={business.address}
            name={business.name}
            description={business.description}
            image_url={business.image_url}
            city={business.city}
            state={business.state}
          />
        );
      })}
    </div>
  );
};

export default BusinessGrid;
