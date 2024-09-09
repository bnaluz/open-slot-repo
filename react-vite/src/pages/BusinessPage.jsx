import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBusiness,
  deleteBusiness,
  fetchBusiness,
} from '../redux/business';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllServices,
  createNewService,
  deleteService,
  updateService,
} from '../redux/service';
import styles from './BusinessPage.module.css';

const BusinessPage = () => {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business.currentBusiness);
  const businessServices = useSelector((state) =>
    Object.values(state.service.allServices)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [serviceEditing, setServiceEditing] = useState(null);
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    duration: '',
  });
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '',
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errors, setErrors] = useState({});
  const [serviceErrors, setServiceErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBusiness(id));
    dispatch(fetchAllServices(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (business) {
      setName(business.name);
      setDescription(business.description);
      setAddress(business.address);
      setCity(business.city);
      setState(business.state);
      setImageUrl(business.image_url);
    }
  }, [business]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    let err = {};
    if (!name.trim()) err.name = 'Please add a name.';
    if (!description.trim()) err.description = 'Please add a description.';
    if (!address.trim()) err.address = 'Please add an address.';
    if (!city.trim()) err.city = 'Please add a city.';
    if (!state.trim()) err.state = 'Please add a state.';
    if (!imageUrl.trim()) err.image = 'Please add an image.';

    setErrors(err);
    if (Object.keys(err).length === 0) {
      const updatedData = {
        name: name,
        description: description,
        address: address,
        city: city,
        state: state,
        image_url: imageUrl,
      };
      dispatch(updateBusiness(business.id, updatedData));
      setIsEditing(false);
    }
  };

  const handleDeleteBusiness = () => {
    dispatch(deleteBusiness(business.id));
    navigate('/');
  };

  const handleDeleteService = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  const handleEditService = (service) => {
    setServiceEditing(service.id);
    setServiceData({
      name: service.name,
      description: service.description,
      duration: service.duration,
    });
  };

  const handleEditServiceSubmit = (serviceId) => {
    const updatedServiceData = {
      ...serviceData,
    };
    dispatch(updateService(serviceId, updatedServiceData));
    setServiceEditing(null);
  };

  const toggleAddService = () => {
    setIsAddingService(!isAddingService);
  };

  const handleAddServiceSubmit = () => {
    let err = {};
    if (!newService.name.trim()) err.name = 'Please add a name';
    if (!newService.description.trim())
      err.description = 'Please add a description';
    if (!newService.duration.trim()) err.duration = 'Please add a duration';

    setServiceErrors(err);
    if (Object.keys(err).length === 0) {
      const newServiceData = {
        name: newService.name,
        description: newService.description,
        duration: newService.duration,
        business_id: business.id,
      };
      dispatch(createNewService(business.id, newServiceData));
      setIsAddingService(false);
      setNewService({ name: '', description: '', duration: '' });
    }
  };

  return (
    <div className={styles.businessPageContainer}>
      <div className={styles.businessHeader}>
        <div className={styles.businessInfo}>
          <h1>{business.name}</h1>
          <p>{business.description}</p>
          <p>
            {business.address}, {business.city}, {business.state}
          </p>
        </div>
        <img
          src={business.image_url}
          className={styles.businessImage}
          alt="Business"
        />
      </div>

      {business.owner_id === user?.id && (
        <div className={styles.buttonGroup}>
          <button className={styles.editBtn} onClick={toggleEdit}>
            Edit Business
          </button>
          <button className={styles.addServiceBtn} onClick={toggleAddService}>
            Add Service
          </button>
          <button className={styles.deleteBtn} onClick={handleDeleteBusiness}>
            Delete Business
          </button>
        </div>
      )}

      {isAddingService && (
        <div className={styles.addServiceForm}>
          <h3>Add a new service to your business</h3>
          <div>
            <label>Service Name</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              placeholder="Service Name"
            />
            {serviceErrors.name && (
              <div className={styles.errorMessage}>{serviceErrors.name}</div>
            )}
          </div>
          <div>
            <label>Service Description</label>
            <input
              type="text"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              placeholder="Service Description"
            />
            {serviceErrors.description && (
              <div className={styles.errorMessage}>
                {serviceErrors.description}
              </div>
            )}
          </div>
          <div>
            <label>Service Duration</label>
            <input
              type="number"
              value={newService.duration}
              onChange={(e) =>
                setNewService({ ...newService, duration: e.target.value })
              }
              placeholder="Duration (minutes)"
            />
            {serviceErrors.duration && (
              <div className={styles.errorMessage}>
                {serviceErrors.duration}
              </div>
            )}
          </div>
          <button className={styles.saveBtn} onClick={handleAddServiceSubmit}>
            Save Service
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setIsAddingService(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {isEditing && (
        <div className={styles.businessInfoForm}>
          <div>
            <label>New Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              className={styles.inputField}
            />
            {errors.image && (
              <div className={styles.errorMessage}>{errors.image}</div>
            )}
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Business Name"
              className={styles.inputField}
            />
            {errors.name && (
              <div className={styles.errorMessage}>{errors.name}</div>
            )}
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Business Address"
              className={styles.inputField}
            />
            {errors.address && (
              <div className={styles.errorMessage}>{errors.address}</div>
            )}
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="City"
              className={styles.inputField}
            />
            {errors.city && (
              <div className={styles.errorMessage}>{errors.city}</div>
            )}
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder="State"
              className={styles.inputField}
            />
            {errors.state && (
              <div className={styles.errorMessage}>{errors.state}</div>
            )}
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
              className={styles.inputField}
            />
            {errors.description && (
              <div className={styles.errorMessage}>{errors.description}</div>
            )}
          </div>
          <button className={styles.saveBtn} onClick={handleEditSubmit}>
            Save Changes
          </button>
        </div>
      )}

      <h2>Services Offered</h2>
      <div className={styles.servicesSection}>
        {businessServices.length > 0 ? (
          businessServices.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              {serviceEditing === service.id ? (
                <div>
                  <input
                    type="text"
                    value={serviceData.name}
                    onChange={(e) =>
                      setServiceData({ ...serviceData, name: e.target.value })
                    }
                    placeholder="Service Name"
                  />
                  <input
                    type="text"
                    value={serviceData.description}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Service Description"
                  />
                  <input
                    type="number"
                    value={serviceData.duration}
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        duration: e.target.value,
                      })
                    }
                    placeholder="Service Duration"
                  />
                  <button onClick={() => handleEditServiceSubmit(service.id)}>
                    Save
                  </button>
                  <button onClick={() => setServiceEditing(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p>Duration: {service.duration} minutes</p>
                  {user?.id === business.owner_id && (
                    <div className={styles.serviceActionBtns}>
                      <button onClick={() => handleEditService(service)}>
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No services available for this business.</p>
        )}
      </div>
    </div>
  );
};

export default BusinessPage;
