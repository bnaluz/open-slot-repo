import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBusinesses } from '../redux/business';
import BusinessCard from './Business/BusinessCard';

const BusinessTest = () => {
  const dispatch = useDispatch();
  const allBusinesses = useSelector((state) =>
    Object.values(state.business.allBusinesses)
  );
  console.log(allBusinesses);

  useEffect(() => {
    dispatch(fetchAllBusinesses());
  }, [dispatch]);

  return (
    <div>
      {allBusinesses.map((business) => {
        return (
          <div key={business.id}>
            <BusinessCard
              key={business.id}
              id={business.id}
              address={business.address}
              name={business.name}
              image_url={business.image_url}
              city={business.city}
              state={business.state}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BusinessTest;
