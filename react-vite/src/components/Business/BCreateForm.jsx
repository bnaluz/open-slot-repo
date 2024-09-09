import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewBusiness } from '../../redux/business';
import styles from './BCreateForm.module.css';
import { useNavigate } from 'react-router-dom';

const BCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!name.trim()) validationErrors.name = 'Business name is required.';
    if (!description.trim())
      validationErrors.description = 'Description is required.';
    if (!address.trim()) validationErrors.address = 'Address is required.';
    if (!city.trim()) validationErrors.city = 'City is required.';
    if (!state.trim()) validationErrors.state = 'State is required.';
    if (!image.trim()) validationErrors.image = 'Image URL is required.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const businessData = {
      name: name,
      description: description,
      address: address,
      city: city,
      state: state,
      image_url: image,
    };

    dispatch(createNewBusiness(businessData));
    navigate('/business/all');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Add Your Business</h1>
        <p className={styles.formSubtitle}>
          Please provide the details below to list your business.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Business Name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Briefly describe your business
            </label>
            <input
              type="text"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className={styles.errorMessage}>{errors.description}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Address</label>
            <input
              type="text"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && (
              <p className={styles.errorMessage}>{errors.address}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>City</label>
            <input
              type="text"
              className={styles.input}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {errors.city && (
              <p className={styles.errorMessage}>{errors.city}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>State</label>
            <input
              type="text"
              className={styles.input}
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            {errors.state && (
              <p className={styles.errorMessage}>{errors.state}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Image URL</label>
            <input
              type="text"
              className={styles.input}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && (
              <p className={styles.errorMessage}>{errors.image}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BCreateForm;
