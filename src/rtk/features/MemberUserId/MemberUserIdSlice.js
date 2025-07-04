import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const MemberUserIdSlice = createSlice({
  name: "Member_userid",
  initialState,
  reducers: {
    setMemberUserID: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMemberUserID } = MemberUserIdSlice.actions;

export default MemberUserIdSlice.reducer;
