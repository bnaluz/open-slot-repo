import { Link } from 'react-router-dom';

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
    <div>
      <Link
        key={id}
        to={`/business/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div>{name}</div>
        <div>
          <div>{address}</div>
          <div>{city}</div>
          <div>{state}</div>
        </div>
        <div>{description}</div>
        <img src={image_url}></img>
      </Link>
    </div>
  );
};

export default BusinessCard;
