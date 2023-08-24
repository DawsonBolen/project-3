// Other action types
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const ENDORSE_SKILL_SUCCESS = 'ENDORSE_SKILL_SUCCESS';
export const ENDORSE_SKILL_FAIL = 'ENDORSE_SKILL_FAIL';

// ... add more action types as needed

// Action creators (optional, but commonly used)
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const fetchProfileSuccess = (profile) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: profile,
  };
};

export const fetchProfileFail = (error) => {
  return {
    type: FETCH_PROFILE_FAIL,
    payload: error,
  };
};

export const updateProfileSuccess = (updatedProfile) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: updatedProfile,
  };
};

export const updateProfileFail = (error) => {
  return {
    type: UPDATE_PROFILE_FAIL,
    payload: error,
  };
};

// ... add more action creators as needed

// Export all the action types and action creators
export {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  FETCH_SKILLS_SUCCESS,
  FETCH_SKILLS_FAIL,
  ENDORSE_SKILL_SUCCESS,
  ENDORSE_SKILL_FAIL,
  // ... other action types
};
