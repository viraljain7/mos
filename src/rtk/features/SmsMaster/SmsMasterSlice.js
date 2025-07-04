import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const SmsMasterSlice = createSlice({
  name: "sms_id",
  initialState,
  reducers: {
    setSmsId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSmsId } = SmsMasterSlice.actions;

export default SmsMasterSlice.reducer;
