import {
  SET_LoginFormOpen,
  SET_SignupFormOpen,
  SET_EMAIL,
  SET_PASSWORD,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PHONE_NUMBER,
  SET_CREATE_BUISNESS_PAGE,
  SET_SECOND_CREATE_BUISNESS_PAGE,
  SET_THIRD_CREATE_BUISNESS_PAGE,
  SET_FOURTH_CREATE_BUISNESS_PAGE,
  SET_BUISNESS_NAME,
  SET_PINCODE,
  SET_STREET,
  SET_AREA,
  SET_CITY,
  SET_STATE,
  SET_CONTACT_PERSON,
  SET_PHONE,
  SET_DAYS_OPEN,
  SET_OPEN_AT,
  SET_CLOSE_AT,
  SET_CATEGORY,
  SET_CONTACT_EMAIL,
  SET_ADHAAR,
  SET_SUCESS_PAGE,
} from "./actionTypes";

export const setLoginForm = (open) => ({
  type: SET_LoginFormOpen,
  payload: open,
});

export const setSignUpForm = (open) => ({
  type: SET_SignupFormOpen,
  payload: open,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: password,
});

export const setfirstName = (firstName) => ({
  type: SET_FIRST_NAME,
  payload: firstName,
});

export const setlastName = (lastName) => ({
  type: SET_LAST_NAME,
  payload: lastName,
});

export const setPhoneNumber = (phoneNumber) => ({
  type: SET_PHONE_NUMBER,
  payload: phoneNumber,
});

export const setFirstCreatePage = (open) => ({
  type: SET_CREATE_BUISNESS_PAGE,
  payload: open,
});
export const setSecondCreatePage = (open) => ({
  type: SET_SECOND_CREATE_BUISNESS_PAGE,
  payload: open,
});
export const setThirdCreatePage = (open) => ({
  type: SET_THIRD_CREATE_BUISNESS_PAGE,
  payload: open,
});

export const setFourthCreatePage = (open) => ({
  type: SET_FOURTH_CREATE_BUISNESS_PAGE,
  payload: open,
});
export const setBuisnessName = (buisnessName) => ({
  type: SET_BUISNESS_NAME,
  payload: buisnessName,
});

export const setPincode = (pincode) => ({
  type: SET_PINCODE,
  payload: pincode,
});

export const setBuildingName = (buisnessName) => ({
  type: SET_BUISNESS_NAME,
  payload: buisnessName,
});

export const setStreet = (street) => ({
  type: SET_STREET,
  payload: street,
});

export const setArea = (area) => ({
  type: SET_AREA,
  payload: area,
});

export const setCity = (city) => ({
  type: SET_CITY,
  payload: city,
});

export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});

export const setContactPerson = (name) => ({
  type: SET_CONTACT_PERSON,
  payload: name,
});
export const setPhone = (number) => ({
  type: SET_PHONE,
  payload: number,
});
export const setContactEmail = (email) => ({
  type: SET_CONTACT_EMAIL,
  payload: email,
});
export const setAdhaar = (adhaar) => ({
  type: SET_ADHAAR,
  payload: adhaar,
});

export const setDaysOpen = (daysOpen) => ({
  type: SET_DAYS_OPEN,
  payload: daysOpen,
});

export const setOpenAt = (openAt) => ({
  type: SET_OPEN_AT,
  payload: openAt,
});

export const setCloseAt = (closeAt) => ({
  type: SET_CLOSE_AT,
  payload: closeAt,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setSuccessPage = (open) => ({
  type: SET_SUCESS_PAGE,
  payload: open,
});
