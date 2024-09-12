//*VARIABLE TYPES
const GET_SERVICES = 'service/GET_SERVICES';
const CREATE_SERVICE = 'service/CREATE_SERVICE';
const GET_SERVICE = 'service/GET_SERVICE';
const UPDATE_SERVICE = 'service/UPDATE_SERVICE';
const DELETE_SERVICE = 'service/DELETE_SERVICE';

//*ACTIONS
const setAllServices = (services) => {
  return {
    type: GET_SERVICES,
    payload: services,
  };
};

const addNewService = (newServiceData) => {
  return {
    type: CREATE_SERVICE,
    payload: newServiceData,
  };
};

const setCurrentService = (service) => {
  return {
    type: GET_SERVICE,
    payload: service,
  };
};

const setUpdateService = (service) => {
  return {
    type: UPDATE_SERVICE,
    payload: service,
  };
};

const removeService = (deletedServiceId) => {
  return {
    type: DELETE_SERVICE,
    payload: deletedServiceId,
  };
};

//*THUNKS
export const fetchAllServices = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/businesses/${id}/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const services = await response.json();
    if (services.length === 0) {
      dispatch(setAllServices([]));
    } else {
      dispatch(setAllServices(services));
    }
  } catch (error) {
    console.error('Error', error);
  }
};

export const createNewService = (business_id, data) => async (dispatch) => {
  try {
    const response = await fetch(`/api/businesses/${business_id}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const newService = await response.json();
    dispatch(addNewService(newService));
    return newService;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchService = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/services/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service.');
    }
    const service = await response.json();
    dispatch(setCurrentService(service));
  } catch (error) {
    console.error('Error', error);
  }
};

export const updateService = (id, data) => async (dispatch) => {
  try {
    const response = await fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update service.');
    }
    const updatedService = await response.json();
    dispatch(setUpdateService(updatedService));
  } catch (error) {
    console.log('Error', error);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete');
    }
    const deleted = await response.json();
    dispatch(removeService(id));
    return deleted;
  } catch (error) {
    console.error('Error:', error);
  }
};

const initialState = {
  allServices: {},
  currentService: {},
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES: {
      const all = {};
      if (action.payload && action.payload.length > 0) {
        action.payload.forEach((service) => {
          all[service.id] = service;
        });
      }
      return {
        ...state,
        allServices: { ...all },
      };
    }
    case CREATE_SERVICE: {
      return {
        ...state,
        allServices: {
          ...state.allServices,
          [action.payload.id]: action.payload,
        },
      };
    }
    case GET_SERVICE: {
      return {
        ...state,
        currentService: action.payload,
      };
    }
    case UPDATE_SERVICE: {
      return {
        ...state,
        allServices: {
          ...state.allServices,
          [action.payload.id]: action.payload,
        },
        currentService: action.payload,
      };
    }
    case DELETE_SERVICE: {
      const newState = { ...state.allServices };
      delete newState[action.payload];
      return {
        ...state,
        allServices: { ...newState },
        currentService: {},
      };
    }
    default:
      return state;
  }
};

export default serviceReducer;
