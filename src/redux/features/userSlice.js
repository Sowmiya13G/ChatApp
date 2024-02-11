import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    ToDetails: [],
    messages: [],
    profileImage: null,
  },
  reducers: {
    setUserData: (state = userSlice.initialState, action) => {
      state.userData = action.payload
    },
    ToDetails: (state = userSlice.initialState, action) => {
      state.ToDetails = action.payload;
    },
    setMessagesStore: (state = userSlice.initialState, action) => {
      state.messages = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const {setUserData, ToDetails, setProfileImage,setMessagesStore} = userSlice.actions;
export default userSlice.reducer;
