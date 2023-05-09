import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
import drump from "../../../images/card/drump.png";




class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    //  this.mm("dispose");
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("connecedUser")),
    };
  }
  
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    const user = JSON.parse(localStorage.getItem("connecedUser"));

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);
  }
  render() {
    /// Path
    const path = window.location.pathname;

    /// Active menu
    let deshBoard = [
        "",
        "workout-statistic",
        "workout-plan",
        "distance-map",
        "diet-food-menu",
        "personal-record",
      ],
      app = [
        "app-profile",
        "app-calender",
        "email-compose",
        "email-inbox",
        "email-read",
        "ecom-product-grid",
        "ecom-product-list",
        "ecom-product-list",
        "ecom-product-order",
        "ecom-checkout",
        "ecom-invoice",
        "ecom-customers",
      ],
      charts = [
        "chart-flot",
        "chart-morris",
        "chart-chartjs",
        "chart-chartist",
        "chart-sparkline",
        "chart-peity",
      ],
      bootstrap = [
        "ui-accordion",
        "ui-badge",
        "ui-alert",
        "ui-button",
        "ui-modal",
        "ui-button-group",
        "ui-list-group",
        "ui-media-object",
        "ui-card",
        "ui-carousel",
        "ui-dropdown",
        "ui-popover",
        "ui-progressbar",
        "ui-tab",
        "ui-typography",
        "ui-pagination",
        "ui-grid",
      ],
      plugins = [
        "uc-select2",
        "uc-nestable",
        "uc-sweetalert",
        "uc-toastr",
        "uc-jqvmap",
        "uc-noui-slider",
      ],
      widget = ["widget"],
      forms = [
        "form-element",
        "form-wizard",
        "form-editor-summernote",
        "form-pickers",
        "form-validation-jquery",
      ],
      table = ["table-bootstrap-basic", "table-datatable-basic"];


    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li
              className={`${
                deshBoard.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link to="/client/home">Dashboard</Link>
                </li>
              </ul>
            </li>
            <li
              className={`${table.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                <i className="flaticon-381-network"></i>
                <span className="nav-text">Tables</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link to="users">Users Management</Link>
                </li>
                <li>
                  <Link to="members">Members Management</Link>
                </li>
                <li>
                  <Link to="Event-Table">Event Management</Link>
                </li>
                <li>
                  <Link to="elections">Elections Management</Link>
                </li>
                <li>
                  <Link to="recrutements">Recrutement Management</Link>
                </li>
                 <li>
                  <Link to="table-club">Clubs Management</Link>
                </li>
              </ul>
            </li>
          </MM>

          <div className="copyright">
            <p>
              <strong>Oasis Dashboard</strong> ©All Rights Reserved
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
