const initialState = {
    errorMessage: null
};


const messReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ERROR_MESSAGE':
        console.log(action.payload+"12938902183")
        return {
          errorMessage: action.payload
        };
      default:
        return state;
    }
  };
  export default messReducer