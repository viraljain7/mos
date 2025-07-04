import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const schemeSlice = createSlice({
  name: "scheme_id",
  initialState,
  reducers: {
    setSchemeId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSchemeId } = schemeSlice.actions;

export default schemeSlice.reducer;
