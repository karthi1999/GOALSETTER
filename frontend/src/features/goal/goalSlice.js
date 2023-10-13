import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// get goal
export const getGoal = createAsyncThunk('goal/getGoal', async (token, thunkAPI) => {
  try {
    // const user = thunkAPI.getState().auth.user
    // const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoal(token)
  } catch (error) {
    const res = error.response
    const message = (res && res.data && res.data.message) || error.message || error.stack.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// create goal
export const createGoal = createAsyncThunk('goal/createGoal', async (text, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    const token = typeof user === 'string' ? JSON.parse(user).token : user.token
    return await goalService.createGoal(text, token)
  } catch (error) {
    const res = error.response
    const message = (res && res.data && res.data.message) || error.message || error.stack.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update goal
export const updateGoal = createAsyncThunk('goal/updateGoal', async (updateData, thunkAPI) => {
  const { id, text } = updateData;
  try {
    const user = thunkAPI.getState().auth.user;
    const token = typeof user === 'string' ? JSON.parse(user).token : user.token;
    return await goalService.updateGoal(id, text, token);
  } catch (error) {
    const res = error.response;
    const message = (res && res.data && res.data.message) || error.message || error.stack.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


// create goal
export const deleteGoal = createAsyncThunk('goal/deleteGoal', async (id, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    const token = typeof user === 'string' ? JSON.parse(user).token : user.token
    return await goalService.deleteGoal(id, token)
  } catch (error) {
    const res = error.response
    const message = (res && res.data && res.data.message) || error.message || error.stack.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
        state.message = ''
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.data = null
        state.message = action.payload
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.filter((item) => item._id !== action.payload.id)
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = 'updated successfully'
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer