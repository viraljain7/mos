import { configureStore } from "@reduxjs/toolkit";
import schemeReducer from "./features/scheme/schemeSlice";
import ApiManagerReducer from "./features/APIManager/ApiMangaerSlice";
import SmsMasterReducer from "./features/SmsMaster/SmsMasterSlice";
import BankPayoutReducer from "./features/QuickTransfer/BankPayoutSlice";
import MemberUserIdReducer from "./features/MemberUserId/MemberUserIdSlice";

export const store = configureStore({
  reducer: {
    scheme: schemeReducer,
    ApiManager: ApiManagerReducer,
    SmsMaster: SmsMasterReducer,
    QuickTransfer: BankPayoutReducer,
    MemberUserId:MemberUserIdReducer,
  },
});
