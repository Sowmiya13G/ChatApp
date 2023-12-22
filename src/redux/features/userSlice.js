import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    ToDetails: [],
    profileImage: null,
  },
  reducers: {
    setUserData: (state = userSlice.initialState, action) => {
      state.userData = action.payload
    },
    ToDetails: (state = userSlice.initialState, action) => {
      console.log('fffdd', action);
      state.ToDetails = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const {setUserData, ToDetails, setProfileImage} = userSlice.actions;
export default userSlice.reducer;
