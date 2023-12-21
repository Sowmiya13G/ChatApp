import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    ToDetails: []
  },
  reducers: {
    setUserData: (state = userSlice.initialState, action) => {
      state.userData = [action.payload]
    },
    ToDetails: (state = userSlice.initialState, action) => {
      console.log("fffdd", action)
      state.ToDetails = action.payload
    }

  },
});


export const { setUserData, ToDetails } = userSlice.actions;
export default userSlice.reducer;
