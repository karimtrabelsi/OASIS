import React from "react";

/// React router dom
import { Route, Routes } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Pages
import Registration from "./pages/Registration";
import Recrutement from "./pages/Recrutement";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
/// Widget
import Widget from "./pages/Widget";

/// Deshboard
import Home from "./components/Dashboard/Home";
import WorkoutStatistic from "./components/Dashboard/WorkoutStatistic";
import WorkoutPlan from "./components/Dashboard/WorkoutPlan";
import DistanceMap from "./components/Dashboard/DistanceMap";
import DietFoodMenu from "./components/Dashboard/DietFoodMenu";
import PersonalRecord from "./components/Dashboard/PersonalRecord";

/// Bo
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import FrontProfile from "./components/AppsMenu/AppProfile/FrontProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Chirt
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";

import BtcChart from "./components/charts/apexcharts/ApexChart";

/// Table
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";
import ClubTable from "./components/table/ClubTable";
import Club from "./components/table/Club";

import ElectionTable from "./components/table/ElectionTable";
import ApplyPage from "./components/table/ApplyPage";
import ApexChart from "./components/charts/apexcharts";
import FeesCollection from "./components/table/FeesCollection";
import EventTable from "./components/table/EventTable";
import RecrutementTable from "./components/table/RecrutementTable";
/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pulgin
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import RechartJs from "./components/charts/rechart";
import axios from "axios";
import Header from "./layouts/nav/Header";
import Register from "./pages/Registration";
import BasicDatatable from "./components/table/BasicDatatable";
//import { formatRelativeWithOptions } from "date-fns/esm/fp";
import { RequireAuth } from "./pages/authprovider";
// import EventTable from "./components/table/EventTable";

import Client from "./pages/client";
import useAuthStore from "../utils/zustand";
import FrontLayout from "./layouts/frontLayout";
import HomeFront from "./components/frontOffice/home";
import Donations from "./pages/donations";
import DonationsTable from "./components/table/DonationsTable";

const Markup = () => {
  const authRoutes = [
    { url: "page-register", component: Registration },
    { url: "page-reset-password", component: ResetPassword },
    { url: "page-new-password", component: NewPassword },
    { url: "page-twofactor-auth", component: TwoFactorAuth },
    { url: "page-login", component: Login },
    // { url: "*", component: Login },
  ];

  const routes = [
    /// Deshborad
    { url: "", component: Home },
    { url: "workout-statistic", component: WorkoutStatistic },
    { url: "workout-plan", component: WorkoutPlan },
    { url: "distance-map", component: DistanceMap },
    { url: "diet-food-menu", component: DietFoodMenu },
    { url: "personal-record", component: PersonalRecord },
    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },
    /// Apps
    { url: "front-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    { url: "post-details", component: PostDetails },
    /// Shop
    { url: "ecom-product-grid", component: ProductGrid },
    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-btc", component: BtcChart },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// table
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-election", component: ElectionTable },
    { url: "table-apply", component: ApplyPage },
    { url: "table-bootstrap-basic", component: BootstrapTable },
    { url: "Event-Table", component: FeesCollection },
    { url: "Table-Event", component: EventTable },
    { url: "table-club", component: Club },
    { url: "table-club-front", component: ClubTable },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// Plugin

    { url: "uc-select2", component: Select2 },
    { url: "uc-nestable", component: Nestable },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },

    /// pages
    { url: "widget-basic", component: Widget },

    // { url: "page-register", component: Registration },
    // { url: "page-reset-password", component: ResetPassword },
    // { url: "page-new-password", component: NewPassword },
    // { url: "page-twofactor-auth", component: TwoFactorAuth },
    // { url: "page-login", component: Login },
    // { url: "*", component: Error404 },

    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];

  const { user } = useAuthStore();

  if (user && JSON.parse(user).role === "Member")
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/twofactor-auth" element={<TwoFactorAuth />} />
        <Route path="/client" element={<FrontLayout />}>
          <Route path="profile" element={<FrontProfile />} />
          <Route path="home" element={<HomeFront />} />
          <Route path="elections" element={<ElectionTable />} />
          <Route path="table-apply" element={<ApplyPage />} />
          <Route path="table-club-front" element={<ClubTable />} />
          <Route path="Event-Table" element={<FeesCollection />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    );
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recrutement" element={<Recrutement />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/twofactor-auth" element={<TwoFactorAuth />} />
      <Route path="/client" element={<Client />}>
        <Route path="donations" element={<Donations />} />
        {/* <Route path="donations" element={<DonationsTable />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<FrontProfile />} />
        <Route path="users" element={<BootstrapTable />} />
        <Route path="members" element={<DataTable />} />
        <Route path="Event-Table" element={<FeesCollection />} />
        <Route path="elections" element={<ElectionTable />} />
        <Route path="recrutements" element={<RecrutementTable />} />
        <Route path="table-apply" element={<ApplyPage />} />
        <Route path="table-club" element={<Club />} />
        <Route path="table-club-front" element={<ClubTable />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default Markup;
