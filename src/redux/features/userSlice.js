import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: []
  },
  reducers: {
    setUserData: (state = userSlice.initialState, action) => {
      state.userData = action.payload
    }

  },
});


export const { } = itemSlice.actions;
export default userSlice.reducer;
