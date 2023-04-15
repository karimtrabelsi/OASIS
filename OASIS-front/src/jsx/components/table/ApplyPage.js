import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Field, useFormik } from "formik";


import {
   Row,
   Col,
   Card,
   CardDeck,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
   Button,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const ApplyPage = () => {
   const svg1 = (
      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
         </g>
      </svg>
   );

   const images = require.context('../../../images/users/', true, /\.(png|jpe?g|gif|svg)$/);
   const [search, setSearch] = useState("");
   const [candidacies, setCandidacies] = useState([]);
   const [applied, setApplied] = useState(false);
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const idelection = urlParams.get("id");
   const [selectedType, setSelectedType] = useState('');
   const userr = JSON.parse(localStorage.getItem("connectedUser"));
   useEffect(() => {
      axios
         .get("http://localhost:3000/candidacy")
         .then((res) => {
            setCandidacies(res.data);
         })
         .catch((err) => {
            console.log(err);
         });

      axios
         .get(`http://localhost:3000/election/${idelection}`)
         .then((res) => {
            const selectedType = res.data.type;
            setSelectedType(selectedType);
            console.log(selectedType);
         })
         .catch((err) => {
            console.log(err);
         });

      search && setCandidacies(candidacies.filter((candidacy) => candidacy.position.includes(search)));
   }, [candidacies, idelection, search]);

   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Elections</Card.Title>
                     <div className="d-flex justify-content-between ">
                        <div className="input-group search-area d-lg-inline-flex d-none mr-5">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                              onChange={(e) => setSearch(e.target.value)}
                           />
                           <div className="input-group-append">
                              <span className="input-group-text">
                                 <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                                       fill="#A4A4A4"
                                    />
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                     <button
                        type="button"
                        className="btn btn-info btn-rounded"
                        onClick={() =>
                           axios.get(`http://localhost:3000/candidacy/${userr._id}/${idelection}`)
                              .then((response) => {
                                 if (response.status === 200) {
                                    // User already applied
                                    Swal.fire({
                                       title: "Already Applied",
                                       text: "You have already applied to this election.",
                                       icon: "info",
                                    });
                                 } else {
                                    Swal.fire({
                                       title: "Apply",
                                       html:
                                          `<input type="textarea" required class="swal2-input" name="description" placeholder="Description" />
    <div class="form-group">
        <label for="position">Position:</label>
        <select id="position" name="position" class="swal2-input">
            ${selectedType === "ExecutiveBoard" ?
                                             `<option value="President">President</option>
            <option value="Vice-President">Vice-President</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Protocol">Protocol</option>` :
           `<option value="ChiefExecutiveOfficer">Chief Executive Officer</option>
            <option value="ChiefOperatingOfficer">Chief Operating Officer</option>
            <option value="ChiefFinancialOfficer">Chief Financial Officer</option>
            <option value="ChiefMarketingOfficer">Chief Marketing Officer</option>
            <option value="ChiefTechnologyOfficer">Chief Technology Officer</option>
            <option value="ChiefHumanResourcesOfficer">Chief Human Resources Officer</option>`}
        </select>
    </div>
    <br></br>
    <div className="input_wrap">
        <input type="file" className="form-control" name="file" id="file" />
        <label>File</label>
    </div>`,
                                       icon: "info",
                                       buttons: false,
                                       dangerMode: true,
                                       showCloseButton: true,
                                       preConfirm: () => {
                                          const description = Swal.getPopup().querySelector(
                                             'input[name="description"]'
                                          ).value;
                                          const position = Swal.getPopup().querySelector(
                                             'select[name="position"]'
                                          ).value;
                                          const fileInput = Swal.getPopup().querySelector('input[name="file"]');
                                          const file = fileInput.files[0];

                                          if (!description || !position || !file) {
                                             Swal.showValidationMessage("Please fill in all fields");
                                          }
                                          return { electionSelected: idelection, user: userr._id, description: description, position: position, file: file, idElection: idelection };
                                       },
                                    }).then((result) => {
                                       axios.post("http://localhost:3000/candidacy/newCandidacy", result.value, {
                                          headers: {
                                             "Content-Type": "multipart/form-data",
                                          },
                                       }).then((response) => {
                                          if (response.status !== 200) {
                                             throw new Error("Network response was not ok");
                                          }
                                          Swal.fire({
                                             icon: "success",
                                             title: "Applied successfully",
                                             showConfirmButton: false,
                                             timer: 1500,
                                          });
                                       }).catch((error) => {
                                          console.error("There was an error applying", error);
                                          swal({
                                             title: 'Oops!',
                                             text: 'Something went wrong. Please try again later.',
                                             icon: 'error',
                                             button: 'OK'
                                          });
                                       });
                                    })
                                 }
                              })
                        }
                        variant="primary"
                     >
                        <span className="btn-icon-left text-info">
                           <i className="fa fa-plus color-info"></i>
                        </span>
                        Apply
                     </button>

                  </Card.Header>
                  <Card.Body>

                     {candidacies
                        .filter((candidacy) => candidacy.electionSelected === idelection)
                        .reduce((accumulator, candidacy, index) => {
                           if (index % 3 === 0) {
                              accumulator.push([]);
                           }
                           accumulator[accumulator.length - 1].push(
                              <Card className="my-3" style={{ width: "30px" }}>
                                 <Card.Header>
                                    <div className="d-flex justify-content-between">
                                       <h5>Position : {candidacy.position}</h5>
                                    </div>
                                    <button type="button" className="btn btn-outline-danger btn-rounded" onClick={() =>
                                       swal({
                                          title: "Are you sure?",
                                          text: "Once deleted, your apply will not be available anymore and your votes will be removed !",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                       }).then((willDelete) => {
                                          if (willDelete) {
                                             axios
                                                .delete(
                                                   "http://localhost:3000/candidacy/deleteCandidacy/" +
                                                   candidacy._id
                                                )
                                                .then((res) => {
                                                   // console.log(res)
                                                   if ((res.respone = 200)) {
                                                      swal(
                                                         candidacy.user.firstname + " deleted !",
                                                         {
                                                            icon: "success",
                                                         }
                                                      );
                                                   } else {
                                                      swal("Connection Error!");
                                                   }
                                                })
                                                .catch((err) => {
                                                   console.log(err);
                                                });
                                          } else {
                                             swal("Nothing changed !");
                                          }
                                       })
                                    }
                                       variant="primary"><i className="fa fa-close"></i></button>

                                 </Card.Header>
                                 <Card.Img variant="top" src={images('./' + candidacy.user.image)} style={{ maxWidth: "50%", maxHeight: "50%", margin: "auto" }} />

                                 <Card.Body>
                                    <Card.Title>Name : {candidacy.user.firstname}</Card.Title>
                                    <Card.Text>Description : {candidacy.description}</Card.Text>
                                    <Card.Text className="card-text-link" onClick={() => window.open(`http://localhost:3000/uploads/${candidacy.file}`, '_blank')}>Presentation: {candidacy.file}</Card.Text>
                                    <Card.Text>Vote : {candidacy.vote}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                       <button type="button" className="btn btn-outline-info btn-rounded" variant="primary" >Vote</button>
                                       <button type="button" className="btn btn-outline-info btn-rounded"
                                          onClick={() =>
                                             Swal.fire({
                                                title: "Update Candidacy",
                                                html:
                                                   '<input type="textarea" required class="swal2-input" name="description" value="' +
                                                   candidacy.description +
                                                   '" placeholder="Description" />' +
                                                   '<div class="form-group">' +
                                                   '<label for="position" >Position:</label>' +
                                                   '<select id="position" name="position" class="swal2-input">' +
                                                   '<option value="President"' +
                                                   (candidacy.position === "President" ? "selected" : "") +
                                                   '>President</option>' +
                                                   '<option value="Vice-President"' +
                                                   (candidacy.position === "Vice-President" ? "selected" : "") +
                                                   '>Vice-President</option>' +
                                                   '<option value="Secretary"' +
                                                   (candidacy.position === "Secretary" ? "selected" : "") +
                                                   '>Secretary</option>' +
                                                   '<option value="Treasurer"' +
                                                   (candidacy.position === "Treasurer" ? "selected" : "") +
                                                   '>Treasurer</option>' +
                                                   '<option value="Protocol"' +
                                                   (candidacy.position === "Protocol" ? "selected" : "") +
                                                   '>Protocol</option>' +
                                                   '</select>' +
                                                   '</div>' +
                                                   '<br></br>' +
                                                   '<div className="input_wrap">' +
                                                   '<input type="file" className="form-control" name="file" id="file" />' +
                                                   '<label>File</label>' +
                                                   "</div>",
                                                icon: "info",
                                                buttons: false,
                                                dangerMode: true,
                                                preConfirm: () => {
                                                   const description = Swal.getPopup().querySelector(
                                                      'input[name="description"]'
                                                   ).value;
                                                   const position = Swal.getPopup().querySelector(
                                                      'select[name="position"]'
                                                   ).value;
                                                   const fileInput = Swal.getPopup().querySelector('input[name="file"]');
                                                   const file = fileInput.files[0];

                                                   if (!description || !position) {
                                                      Swal.showValidationMessage("Please fill in all fields");
                                                   }
                                                   return {
                                                      _id: candidacy._id,
                                                      user: userr._id,
                                                      description: description,
                                                      position: position,
                                                      file: file,
                                                      idElection: idelection,
                                                   };
                                                },
                                             }).then((result) => {
                                                const data = new FormData();
                                                data.append("description", result.value.description);
                                                data.append("position", result.value.position);
                                                if (result.value.file) {
                                                   data.append("file", result.value.file);
                                                }

                                                axios
                                                   .put(`http://localhost:3000/candidacy/updateCandidacy/${candidacy._id}`, data, {
                                                      headers: {
                                                         "Content-Type": "multipart/form-data",
                                                      },
                                                   })
                                                   .then((response) => {
                                                      if (response.status !== 200) {
                                                         throw new Error("Network response was not ok");
                                                      }
                                                      Swal.fire({
                                                         icon: "success",
                                                         title: "Applied successfully",
                                                         showConfirmButton: false,
                                                         timer: 1500,
                                                      });
                                                   })
                                                   .catch((error) => {
                                                      console.error("There was an error applying", error);
                                                      Swal.fire({
                                                         icon: "error",
                                                         title: "Oops...",
                                                         text: "Something went wrong!",
                                                      });
                                                   });
                                             })
                                          }
                                          variant="primary" > Update </button>
                                    </div>
                                 </Card.Body>
                              </Card>
                           );
                           return accumulator;
                        }, [])
                        .map((cardDeck, index) => <CardDeck key={index}>{cardDeck}</CardDeck>)
                     }
                  </Card.Body>
               </Card>
            </Col>
         </Row >
      </Fragment >

   );
};

export default ApplyPage;
