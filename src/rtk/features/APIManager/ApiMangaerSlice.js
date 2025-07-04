import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const ApiManagerSlice = createSlice({
  name: "api_id",
  initialState,
  reducers: {
    setApiId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApiId } = ApiManagerSlice.actions;

export default ApiManagerSlice.reducer;
