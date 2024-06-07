// userAction.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URI } from '../URI';
import AsyncStorage from '@react-native-async-storage/async-storage';

// register user
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password, avatar }: { name: string, email: string, password: string, avatar: string }, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(`${URI}/registration`, { name, email, password, avatar }, config);
      await AsyncStorage.setItem('token', data.token);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// load user
export const loadUser = createAsyncThunk(
  'user/load',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { data } = await axios.get(`${URI}/me`, { headers: { Authorization: `Bearer ${token}` } });
      return { user: data.user, token };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(`${URI}/login`, { email, password }, config);
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//log out user
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem('token', '');
      return {};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { data } = await axios.get(`${URI}/users`, { headers: { Authorization: `Bearer ${token}` } });
      return data.users;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// follow user
export const followUserAction = createAsyncThunk(
  'user/follow',
  async ({ userId, followUserId, users }: { userId: string, followUserId: string, users: any }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: [...userObj.followers, { userId }],
            }
          : userObj,
      );
      await axios.put(`${URI}/add-user`, { followUserId }, { headers: { Authorization: `Bearer ${token}` } });
      return updatedUsers;
    } catch (error) {
      console.log('Error following user:', error);
      return rejectWithValue(error);
    }
  }
);

// unfollow user
export const unfollowUserAction = createAsyncThunk(
  'user/unfollow',
  async ({ userId, followUserId, users }: { userId: string, followUserId: string, users: any }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: userObj.followers.filter((follower: any) => follower.userId !== userId),
            }
          : userObj,
      );
      await axios.put(`${URI}/remove-user`, { followUserId }, { headers: { Authorization: `Bearer ${token}` } });
      return updatedUsers;
    } catch (error) {
      console.log('Error unfollowing user:', error);
      return rejectWithValue(error);
    }
  }
);
