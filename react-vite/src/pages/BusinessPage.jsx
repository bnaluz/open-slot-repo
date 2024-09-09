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
    <div>
      {business.owner_id === user?.id && (
        <button onClick={toggleEdit}>EDIT ME</button>
      )}

      <h1>BusinessPage</h1>
      <button onClick={handleDeleteBusiness}>DELETE TESTER</button>
      {business.owner_id === user?.id && (
        <button onClick={toggleAddService}>ADD SERVICE</button>
      )}
      {isAddingService && (
        <div>
          <h3>Add a new service to your business!</h3>
          <div>
            <div>
              <label>Service Name</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                placeholder="name"
                style={{ paddingBottom: '50px' }}
              ></input>
              {serviceErrors.name && (
                <div style={{ color: 'red' }}>{serviceErrors.name}</div>
              )}
            </div>
            <div>
              <label>Service Description</label>
              <input
                type="text"
                value={newService.description}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    description: e.target.value,
                  })
                }
                placeholder="description"
              ></input>
              {serviceErrors.description && (
                <div style={{ color: 'red' }}>{serviceErrors.description}</div>
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
                placeholder="in minutes"
              ></input>
              {serviceErrors.duration && (
                <div style={{ color: 'red' }}>{serviceErrors.duration}</div>
              )}
            </div>
          </div>
          <button onClick={handleAddServiceSubmit}>Save Service</button>
          <button onClick={() => setIsAddingService(false)}>Cancel</button>
        </div>
      )}
      <img src={business.image_url}></img>
      {isEditing ? (
        <div>
          <label>New Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          ></input>
          {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
        </div>
      ) : (
        <></>
      )}
      {isEditing ? (
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Business Name"
          ></input>
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
      ) : (
        <div>{business.name}</div>
      )}
      {isEditing ? (
        <div>
          <label>Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Business Address"
          ></input>
          {errors.address && (
            <div style={{ color: 'red' }}>{errors.address}</div>
          )}
        </div>
      ) : (
        <div>{business.address}</div>
      )}

      {isEditing ? (
        <div>
          <label>City</label>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City"
          ></input>
          {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
        </div>
      ) : (
        <div>{business.city}</div>
      )}

      {isEditing ? (
        <div>
          <label>State</label>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="State"
          ></input>
          {errors.state && <div style={{ color: 'red' }}>{errors.state}</div>}
        </div>
      ) : (
        <div>{business.state}</div>
      )}
      {isEditing ? (
        <div>
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
          ></input>
          {errors.description && (
            <div style={{ color: 'red' }}>{errors.description}</div>
          )}
        </div>
      ) : (
        <div>{business.description}</div>
      )}
      {isEditing ? <button onClick={handleEditSubmit}>SAVE</button> : <></>}

      <h2>Services Offered</h2>
      {businessServices.length > 0 ? (
        businessServices.map((service) => (
          <div key={service.id}>
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
                <button onClick={() => setServiceEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>Duration: {service.duration} minutes</p>
                {user?.id === business.owner_id && (
                  <>
                    <button onClick={() => handleEditService(service)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteService(service.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No services available for this business.</p>
      )}
    </div>
  );
};

export default BusinessPage;
