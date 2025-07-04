import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const BankPayoutSlice = createSlice({
  name: "Bank_Payout_id",
  initialState,
  reducers: {
    setBankId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBankId } = BankPayoutSlice.actions;

export default BankPayoutSlice.reducer;
