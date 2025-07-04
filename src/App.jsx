import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePageOne from "./pages/Application/Dashboard/HomePageOne.jsx";
import ErrorPage from "./pages/ErrorPage";

import RouteScrollToTop from "./helper/RouteScrollToTop";
import ActionViewPage from "./pages/ActionViewPage";
import SignInPage from "./pages/Application/Dashboard/SignInPage.jsx";
//All Txn Report
import AllTransactionReportPage from "./pages/Application/TxnReport/AllTransactionReportPage.jsx";
import SuccessTxnReportPage from "./pages//Application/TxnReport/SuccessTxnReportPage.jsx";
import PendingTxnReportPage from "./pages/Application/TxnReport/PendingTxnReportPage.jsx";
import FailedTxnReportPage from "./pages/Application/TxnReport/FailedTxnReportPage.jsx";
import RefundTxnReportPage from "./pages//Application/TxnReport/RefundTxnReportPage.jsx";
//Acc Stmt
import CreditLedgerPage from "./pages/Application/AccStmt/CreditLedgerPage.jsx";
import DebitLedgerPage from "./pages/Application/AccStmt/DebitLedgerPage.jsx";
//Services
import AepsPage from "./pages/Application/Services/AepsPage.jsx";
import RechargePage from "./pages/Application/Services/RechargePage.jsx";
import BbpsPage from "./pages/Application/Services/BbpsPage.jsx";
import BookingPage from "./pages/Application/Services/BookingPage.jsx";
import DmtPage from "./pages/Application/Services/DmtPage.jsx";
import QuickTransferPage from "./pages/Application/Services/QuickTransferPage.jsx";
import CmsPage from "./pages/Application/Services/CmsPage.jsx";
//Funds
import TransferReturnPage from "./pages/Application/Fund/TransferReturnPage.jsx";
import FundReportPage from "./pages/Application/Fund/FundReportPage";
import RequestFundPage from "./pages/Application/Fund/RequestFundPage.jsx";
//Member
import SchemePayoutPage from "./pages/SchemePayoutPage";
import MemberActionBtnProfilePage from "./pages/MemberActionBtnProfilePage";
import WhiteLabelPage from "./pages/Application/Member/WhiteLabelPage.jsx";
import CnfPage from "./pages/Application/Member/CnfPage.jsx";
import MasterDistributorPage from "./pages/Application/Member/MasterDistributorPage.jsx";
import DistributorPage from "./pages/Application/Member/DistributorPage.jsx";
import RetailerPage from "./pages/Application/Member/RetailerPage.jsx";
import ApiUserPage from "./pages/Application/Member/ApiUserPage.jsx";
//Master
import LoginUserProfilePage from "./pages/Application/Dashboard/LoginUserProfilePage.jsx";
import SmsMasterPage from "./pages/Application/Master/SmsMasterPage.jsx";
import PortalMasterPage from "./pages/Application/Master/PortalMasterPage.jsx";
import BankAccountPage from "./pages/Application/Master/BankAccountPage.jsx";
import SchemeManagerPage from "./pages/Application/Master/SchemeManagerPage.jsx";
import ProvideMasterPage from "./pages/Application/Master/ProvideMasterPage.jsx";
import ApiManagerPage from "./pages/Application/Master/APIManagerPage.jsx";
import SliderMasterPage from "./pages/Application/Master/SliderMasterPage.jsx";
import CreditCardPage from "./pages/Application/Services/CredItCardPage.jsx";
import UpiPage from "./pages/Application/Services/UpiPage.jsx";
import OpenAccountPage from "./pages/Application/Services/OpenNewAccountPage.jsx";
import PayoutReportPage from "./pages/Application/TxnReport/PayoutReportPage.jsx";
import BbpsReportPage from "./pages/Application/TxnReport/BbpsReporPage.jsx";
import CreditCardReportPage from "./pages/Application/TxnReport/CreditCardReportPage.jsx";
import RechargeReportPage from "./pages/Application/TxnReport/RechargeReportPage.jsx";
import UserPermissionPage from "./pages/Application/Member/UserPermissionPage.jsx";
import PermissionPage from "./pages/Application/RolesAndPermission/PermissionPage.jsx";
import DefaultPermissionPage from "./pages/Application/RolesAndPermission/DefaultPermissionPage.jsx";
import LoadWalletRequestPage from "./pages/Application/Fund/LoadWalletRequestPage.jsx";
import UPIPayoutPage from "./pages/Application/Services/UPIPayoutPage.jsx";
import MyCommissionPage from "./pages/Application/Dashboard/MyCommissionPage.jsx";
//helper function
import RBAC from "./helper/ProtectedRoute";
import DMTindonepalPage from "./pages/Application/Services/DMTindonepalPage.jsx";
import DMTppiPage from "./pages/Application/Services/DMTppiPage.jsx";
import DMTdomesticPage from "./pages/Application/Services/DMTdomesticPage.jsx";
import PgPage from "./pages/Application/Services/PgPage.jsx";
import { useIdleTimer } from "react-idle-timer";
import { useEffect, useState } from "react";
import useLogoutAndHomeRedirect from "./components/Application/hooks/useLogoutAndHomeRedirect.js";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const timeoutDuration = 180_000; // 180 seconds (for demo)

  const onIdle = () => {
    setIsLoggedIn(false);
    useLogoutAndHomeRedirect();
    // Add your actual logout logic here (clear tokens, redirect, etc.)
  };

  const { getRemainingTime, reset } = useIdleTimer({
    onIdle,
    timeout: timeoutDuration,
    throttle: 500, // Check every 500ms
    onAction: () => setRemainingTime(getRemainingTime()), // Update on user activity
  });

  // Update remaining time every 100ms for smoother animation
  useEffect(() => {
    setRemainingTime(getRemainingTime()); // Initial set
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 100);

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true, // Fix splat route resolution
        v7_startTransition: true,
      }}
    >
      <RouteScrollToTop />

      <Routes>
        {/* Auth Setting */}

        <Route path="/" element={<SignInPage />} />

        {/* new  Start*/}
        {/* <Route exact path='/' element={<SignInPage />} /> */}
        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePageOne />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/invoice-list/action-view-profile"
          element={
            <ProtectedRoute>
              <ActionViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/recharge"
          element={
            <ProtectedRoute>
              <RechargePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/pg"
          element={
            <ProtectedRoute>
              <PgPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/quick-transfer"
          element={
            <ProtectedRoute>
              <QuickTransferPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upi-transfer"
          element={
            <ProtectedRoute>
              <UPIPayoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/credit-card"
          element={
            <ProtectedRoute>
              <CreditCardPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upi"
          element={
            <ProtectedRoute>
              <UpiPage />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/scheme-manager"
          element={
            <ProtectedRoute>
              <SchemeManagerPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/provide-master"
          element={
            <ProtectedRoute>
              <ProvideMasterPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/api-manager"
          element={
            <ProtectedRoute>
              <ApiManagerPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/slider-master"
          element={
            <ProtectedRoute>
              <SliderMasterPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/permission"
          element={
            <ProtectedRoute>
              <PermissionPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/default-permission"
          element={
            <ProtectedRoute>
              <DefaultPermissionPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/mycommission"
          element={
            <ProtectedRoute>
              <MyCommissionPage />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/user-profile"
          element={
            <ProtectedRoute>
              <LoginUserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/transfer-return"
          element={
            <ProtectedRoute>
              <TransferReturnPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/fund-request"
          element={
            <ProtectedRoute>
              <RequestFundPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/loadwalletrequest"
          element={
            <ProtectedRoute>
              <LoadWalletRequestPage />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/all-fund-report"
          element={
            <ProtectedRoute>
              <FundReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/scheme-manager/:schemeName"
          element={
            <ProtectedRoute>
              <SchemePayoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/sms-master"
          element={
            <ProtectedRoute>
              <SmsMasterPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/portal-master"
          element={
            <ProtectedRoute>
              <PortalMasterPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/bank-account"
          element={
            <ProtectedRoute>
              <BankAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/white-label"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_whitelabel">
                <WhiteLabelPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/cnf"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_cnf">
                <CnfPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/master-distributor"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_masterdistributor">
                <MasterDistributorPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/distributor"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_distributor">
                <DistributorPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/retailer"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_retailer">
                <RetailerPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/api-user"
          element={
            <ProtectedRoute>
              <RBAC permissionSlug="create_apiuser">
                <ApiUserPage />
              </RBAC>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/action-view-profile"
          element={
            <ProtectedRoute>
              <MemberActionBtnProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/user-permission"
          element={
            <ProtectedRoute>
              {/* <MemberActionBtnProfilePage /> */}
              <UserPermissionPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/dmt"
          element={
            <ProtectedRoute>
              <DmtPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/open-account"
          element={
            <ProtectedRoute>
              <OpenAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/cms"
          element={
            <ProtectedRoute>
              <CmsPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/bbps"
          element={
            <ProtectedRoute>
              <BbpsPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/domestic"
          element={
            <ProtectedRoute>
              <DMTdomesticPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ppi"
          element={
            <ProtectedRoute>
              <DMTppiPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/indonepal"
          element={
            <ProtectedRoute>
              <DMTindonepalPage />
            </ProtectedRoute>
          }
        />
          <Route
          exact
          path="/all-transaction-report"
          element={
            <ProtectedRoute>
              <AllTransactionReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/success-txn-report"
          element={
            <ProtectedRoute>
              <SuccessTxnReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/pending-txn-report"
          element={
            <ProtectedRoute>
              <PendingTxnReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/failed-txn-report"
          element={
            <ProtectedRoute>
              <FailedTxnReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/refund-txn-report"
          element={
            <ProtectedRoute>
              <RefundTxnReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/payout-report"
          element={
            <ProtectedRoute>
              <PayoutReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/bbps-report"
          element={
            <ProtectedRoute>
              <BbpsReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/credit-card-report"
          element={
            <ProtectedRoute>
              <CreditCardReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/recharge-report"
          element={
            <ProtectedRoute>
              <RechargeReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/aeps"
          element={
            <ProtectedRoute>
              <AepsPage />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/credit-ledger"
          element={
            <ProtectedRoute>
              <CreditLedgerPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/debit-ledger"
          element={
            <ProtectedRoute>
              <DebitLedgerPage />
            </ProtectedRoute>
          }
        />

        {/* new end*/}

        {/* Auth Setting */}
        <Route
          exact
          path="*"
          element={
            <ProtectedRoute>
              <ErrorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const ProtectedRoute = ({ children }) => {
  // Retrieve the token from localStorage (or wherever it's stored)
  const token = sessionStorage.getItem("token");

  // If no token exists, redirect to "/"
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected content
  return <>{children}</>;
};

export { ProtectedRoute };
