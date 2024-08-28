import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBusiness, deleteBusiness } from '../redux/business';
import { useNavigate } from 'react-router-dom';

//*Individual Business Page, this will display a selected business and its details, also containing the edit buttons

const BusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business.currentBusiness);

  const user = useSelector((state) => state.session.user);

  //*Doing a modal, or possible conditional rendering of input fields once ownership is confirmed and then sending the data off.

  //*Wrote the thunks and actions today for it, need to update the slice of state in redux, but getting an error on attempted update. Removed previous update logic to start fresh.

  //TODO: Set a state for each of the values of the Business Details, check with backend route to ensure sending off all expected data. Create a conditional of inputs or the business details which toggles with isEditing

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(business.name);
    setDescription(business.description);
    setAddress(business.address);
    setCity(business.city);
    setState(business.state);
    setImageUrl(business.image_url);
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

  const handleDelete = () => {
    dispatch(deleteBusiness(business.id));
    navigate('/');
  };

  return (
    <div>
      <div onClick={toggleEdit}>EDIT ME</div>
      <h1>BusinessPage</h1>
      <button onClick={handleDelete}>DELETE TESTER</button>
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
        </div>
      ) : (
        <div>{business.description}</div>
      )}
      {isEditing ? <button onClick={handleEditSubmit}>SAVE</button> : <></>}
    </div>
  );
};

export default BusinessPage;
