import { buisnessCreated } from "./actions";
import {
  SET_AREA,
  SET_BUILDING_NAME,
  SET_BUISNESS_NAME,
  SET_CITY,
  SET_CREATE_BUISNESS_PAGE,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_FOURTH_CREATE_BUISNESS_PAGE,
  SET_LAST_NAME,
  SET_LoginFormOpen,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_PINCODE,
  SET_SECOND_CREATE_BUISNESS_PAGE,
  SET_SignupFormOpen,
  SET_STATE,
  SET_THIRD_CREATE_BUISNESS_PAGE,
  SET_STREET,
  SET_CONTACT_PERSON,
  SET_CONTACT_EMAIL,
  SET_PHONE,
  SET_ADHAAR,
  SET_DAYS_OPEN,
  SET_OPEN_AT,
  SET_CLOSE_AT,
  SET_CATEGORY,
  SET_SUCESS_PAGE,
  SET_SEARCH_CATEGORY,
  SET_SEARCH_LOCATION,
  SET_SEARCH_RESULTS,
  BUISNESS_CREATED_SUCCESSFULLY,
} from "./actionTypes";

const initialState = {
  openLoginForm: false,
  openSignUpForm: false,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  searchCategory: '',
  searchLocation: '',
  searchResults: '',
};

const intialCreateBuisness = {
  firstPage: true,
  secondPage: false,
  thirdPage: false,
  fourthPage: false,
  successPage: false,
  buisnessName: "",
  buildingName: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  area: "",
  contactPerson: "",
  contactEmail: "",
  phoneNumber: "",
  adhaar: "",
  daysOpen: {},
  openAt: "",
  closeAt: "",
  category: "",
  buisnessCreated: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LoginFormOpen:
      return { ...state, openLoginForm: action.payload };
    case SET_SignupFormOpen:
      return { ...state, openSignUpForm: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    case SET_PHONE_NUMBER:
      return { ...state, phone_number: action.payload };
    case SET_SEARCH_CATEGORY:
      return { ...state, searchCategory: action.payload };
    case SET_SEARCH_LOCATION:
      return { ...state, searchLocation: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export const createBuisnessReducer = (state = intialCreateBuisness, action) => {
  switch (action.type) {
    case SET_CREATE_BUISNESS_PAGE:
      return { ...state, firstPage: action.payload };
    case SET_SECOND_CREATE_BUISNESS_PAGE:
      return { ...state, secondPage: action.payload };
    case SET_THIRD_CREATE_BUISNESS_PAGE:
      return { ...state, thirdPage: action.payload };
    case SET_FOURTH_CREATE_BUISNESS_PAGE:
      return { ...state, fourthPage: action.payload };
    case SET_SUCESS_PAGE:
      return { ...state, successPage: action.payload };
    case SET_BUISNESS_NAME:
      return { ...state, buisnessName: action.payload };
    case SET_PINCODE:
      return { ...state, pincode: action.payload };
    case SET_AREA:
      return { ...state, area: action.payload };
    case SET_STREET:
      return { ...state, street: action.payload };
    case SET_BUILDING_NAME:
      return { ...state, buildingName: action.payload };
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_STATE:
      return { ...state, state: action.payload };
    case SET_CONTACT_PERSON:
      return { ...state, contactPerson: action.payload };
    case SET_CONTACT_EMAIL:
      return { ...state, contactEmail: action.payload };
    case SET_PHONE:
      return { ...state, phoneNumber: action.payload };
    case SET_ADHAAR:
      return { ...state, adhaar: action.payload };
    case SET_DAYS_OPEN:
      return { ...state, daysOpen: action.payload };
    case SET_OPEN_AT:
      return { ...state, openAt: action.payload };
    case SET_CLOSE_AT:
      return { ...state, closeAt: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_SUCESS_PAGE:
      return { ...state, successPage: action.payload };
    case BUISNESS_CREATED_SUCCESSFULLY:
      return { ...state, buisnessCreated: action.payload };
    default:
      return state;
  }
};
