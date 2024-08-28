//* VARIABLE TYPES
const GET_BUSINESSES = 'business/GET_BUSINESSES';
const CREATE_BUSINESS = 'business/CREATE_BUSINESS';
const GET_BUSINESS = 'business/GET_BUSINESS';
const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS';
const DELETE_BUSINESS = 'business/DELETE_BUSINESS';

//*ACTIONS
const setAllBusinesses = (businesses) => {
  return {
    type: GET_BUSINESSES,
    payload: businesses,
  };
};

const addNewBusiness = (newBusinessData) => {
  return {
    type: CREATE_BUSINESS,
    payload: newBusinessData,
  };
};

const setCurrentBusiness = (business) => {
  return {
    type: GET_BUSINESS,
    payload: business,
  };
};

const setUpdateBusiness = (business) => {
  return {
    type: UPDATE_BUSINESS,
    payload: business,
  };
};

const removeBusiness = (deletedBussinessId) => {
  return {
    type: DELETE_BUSINESS,
    payload: deletedBussinessId,
  };
};

//*THUNKS
export const fetchAllBusinesses = () => async (dispatch) => {
  try {
    const response = await fetch('/api/businesses/all');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const allBusinesses = await response.json();
    dispatch(setAllBusinesses(allBusinesses));
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createNewBusiness = (data) => async (dispatch) => {
  try {
    const response = await fetch('/api/businesses/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create');
    }
    const newBusiness = await response.json();
    dispatch(addNewBusiness(newBusiness));
    return newBusiness;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchBusiness = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/businesses/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const business = await response.json();
    dispatch(setCurrentBusiness(business));
  } catch (error) {
    console.error('Error', error);
  }
};

export const updateBusiness = (id, data) => async (dispatch) => {
  try {
    const response = await fetch(`/api/businesses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update');
    }
    const updatedBusiness = await response.json();
    dispatch(setUpdateBusiness(updatedBusiness));
  } catch (err) {
    console.error('Error:', err);
  }
};

export const deleteBusiness = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/businesses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete');
    }
    const deleted = await response.json();
    dispatch(removeBusiness(id));
    return deleted;
  } catch (err) {
    console.error('Error:', err);
  }
};

//*INITIAL STATE + REDUCER
const initialState = { allBusinesses: {}, currentBusiness: {} };

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESSES: {
      const all = {};

      action.payload.forEach((business) => {
        all[business.id] = business;
      });
      return {
        ...state,
        allBusinesses: { ...all },
      };
    }
    case CREATE_BUSINESS: {
      return {
        ...state,
        allBusinesses: {
          ...state.allBusinesses,
          [action.payload.id]: action.payload,
        },
      };
    }
    case GET_BUSINESS: {
      return {
        ...state,
        currentBusiness: action.payload,
      };
    }
    case UPDATE_BUSINESS: {
      return {
        ...state,
        currentBusiness: action.payload,
      };
    }
    case DELETE_BUSINESS: {
      const newState = { ...state.allBusinesses };
      delete newState[action.payload];
      return {
        ...state,
        allBusinesses: { ...newState },
        currentBusiness: {},
      };
    }
    default:
      return state;
  }
};

export default businessReducer;
