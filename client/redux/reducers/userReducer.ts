// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loadUser, loginUser, logoutUser, getAllUsers, followUserAction, unfollowUserAction } from '../actions/userAction';

const initialState = {
  isAuthenticated: false,
  loading: false,
  isLoading: false,
  user: {},
  users: [],
  token: "",
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = false;
      //   state.error = action.payload as string;
      // })
      // .addCase(loadUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(loadUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      // })
      // .addCase(loadUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = false;
      //   state.error = action.payload as string;
      // })
      // .addCase(loginUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.user = action.payload;
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = false;
      //   state.error = action.payload as string;
      //   state.user = {};
      // })
      // .addCase(logoutUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.isAuthenticated = false;
      //   state.user = {};
      // })
      // .addCase(logoutUser.rejected, (state) => {
      //   state.loading = false;
      // })
      // .addCase(getAllUsers.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllUsers.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.users = action.payload;
      // })
      // .addCase(getAllUsers.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })
      // .addCase(followUserAction.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(followUserAction.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.users = action.payload;
      // })
      // .addCase(followUserAction.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })
      // .addCase(unfollowUserAction.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(unfollowUserAction.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.users = action.payload;
      // })
      // .addCase(unfollowUserAction.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // });
  }
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
