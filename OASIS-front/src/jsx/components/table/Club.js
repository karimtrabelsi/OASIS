import React, {
    Fragment,
    useEffect,
    useState,
    useCallback,
    useRef,
  } from "react";
  import PageTitle from "../../layouts/PageTitle";
  import swal from "sweetalert";
  import Swal from "sweetalert2";
  import swalMessage from "@sweetalert/with-react";
  
  import {
    Row,
    Col,
    Card,
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
  import { Link } from "react-router-dom";
  import axios from "axios";
  
  const Club = () => {
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
  
    const [clubs, setClubs] = useState([]);
    const [newClubs, setNewClubs] = useState(false);
    const [search, setSearch] = useState("");
    const isMounted = useRef(true);
    const fetchData = useCallback(async () => {
      const response = await axios.get("http://localhost:3000/clubs/getclubs");
      if (isMounted.current) {
        setClubs(response.data);
      }
    }, [clubs]);
    useEffect(() => {
      const userr = JSON.parse(localStorage.getItem("connectedUser"));
  
      axios.get("http://localhost:3000/clubs/getclubs").then((res) => {
      setClubs(res.data);
      }).catch((err) => {
        console.log(err);
      });
  
  
      newClubs && setClubs(clubs.filter((club) => club.approved === false));
      search && setClubs(clubs.filter((club) => club.clubname.includes(search)));
      return () => {
        isMounted.current = false;
      };
    }, [clubs]);
  
    const handleApprove = (id) => {
      axios.post("http://localhost:3000/clubs/approveclub" + id).catch((err) => {
        console.log(err);
      });
    };
  
    return (
      <Fragment>
        <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>Clubs</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between ">
                  <Badge
                    variant={
                      newClubs ? "dark badge-xl dark" : "light badge-xl light"
                    }
                    className=""
                    onClick={() => setNewClubs(!newClubs)}
                  >
                    New Clubs{" "}
                  </Badge>
                  <Button onClick={() => Swal.fire({
                                    title: "Add Club",
                                    html:
                                    '<br></br>'+
                                    '<div class="input_wrap">' +
                                    '<input type="text" required  class="form-control" name="clubname">' +
                                    '<label>Club name</label>' +
                                       '</div>'+
                                       '<br></br>'+
                                       '<div class="input_wrap">' +
                                       '<input type="text" required  class="form-control" name="fp">' +
                                       '<label>Founding President</label>' +
                                          '</div>'+
                                          '<br></br>'+
                                          '<div class="input_wrap">' +
                                          '<input type="text" required  class="form-control" name="city">' +
                                          '<label>City</label>' +
                                             '</div>'+

                                             '<br></br>'+
                                             '<div class="input_wrap ">' +
                                             '<input type="text" required  class="form-control" name="region">' +
                                             '<label>Region</label>' +
                                                '</div>'+

                                                '<br></br>'+
                                               ' <div class="select_wrap">'+
                                             '<select id="type" name="type" class="form-control"  >'+
                                             '<option value="">Select a type</option>'+
'    <option value="Rotary">Rotary</option>'+
   ' <option value="Rotaract">Rotaract </option>'+
    '<option value="Interact">Interact </option>'+
    '<option value="Lions">Lions </option>'+
    '<option value="Leo">Leo </option>'+
 ' </select>'+
 
'</div'+
                                                   '<br></br>'+
                                                   '<div class="input_wrap">' +
                                                   '<input type="text" required  class="form-control" name="club">' +
                                                   '<label>Sponsor Club </label>' +
                                                      '</div>'+
                                  '<br></br>'+
                                  '<div class="input_wrap">' +
                                  '<input type="text" required  class="form-control" name="email">' +
                                  '<label>Email</label>' +
                                '</div>'+
                                '<br></br>'+
                                '<div class="input_wrap">' +
                                '<input type="file"   class="form-control" name="image">' +
                                '<label>image</label>' +
                              '</div>',
                                    icon: "info",
                                    buttons: false,
                                    dangerMode: true,
                                    preConfirm: () => {
                                      const clubname = Swal.getPopup().querySelector(
                                        'input[name="clubname"]'
                                      ).value;
                                      const fp = Swal.getPopup().querySelector(
                                        'input[name="fp"]'
                                      ).value;
                                      const city = Swal.getPopup().querySelector(
                                        'input[name="city"]'
                                      ).value;
                                      const region = Swal.getPopup().querySelector(
                                        'input[name="region"]'
                                      ).value;
                                      const type = Swal.getPopup().querySelector(
                                        'select[name="type"]'
                                      ).value;
                                      const club = Swal.getPopup().querySelector(
                                        'input[name="club"]'
                                      ).value;
                                      const email = Swal.getPopup().querySelector(
                                        'input[name="email"]'
                                      ).value;
                                      const image = Swal.getPopup().querySelector(
                                        'input[name="image"]'
                                      )
                                      const file= image.files[0]
           
                                      if (!clubname ||!fp ||!city ||!region ||!type ||!club || !email || !image ) {
                                         Swal.showValidationMessage('Please fill in all fields');
                                      }
                                      return { clubname: clubname, fp: fp, city: city, region: region, type: type, club: club, email: email,  image: file };
                                   }
                                  }) .then((result) => {

                                    console.log(result)
                                       axios
                                         .post(
                                           "http://localhost:3000/clubs/create" ,
                                                 result.value,{
                                               headers: { 
                                                 'Content-Type': 'multipart/form-data',
                                               }
                                             }
                                         )
                                         .then((res) => {
                                           // console.log(res)
                                           if ((res.respone = 200)) {
                                             Swal.fire("Club has been added!", {
                                               icon: "success",
                                             });
                                           } else {
                                             Swal.fire("something wrong !");
                                           }
                                         })
                                        } )
                     }
                        variant="primary">+ Add</Button>
                  <div className="input-group search-area d-lg-inline-flex d-none ">
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
                <Table responsive>
                  <thead>
                    <tr>
                    <th >
                        <strong></strong>
                      </th>
                      <th className="width80">
                        <strong>Club Name</strong>
                      </th>
                      <th>
                        <strong>Founding President</strong>
                      </th>
                      <th>
                        <strong>Board</strong>
                      </th>
                      <th>
                        <strong>EMAIL</strong>
                      </th>
                      <th>
                        <strong>City</strong>
                      </th>
                      <th>
                        <strong>Region</strong>
                      </th>
                      <th></th>
                      <th>
                        <strong>Type</strong>
                      </th>
                        <th>
                            <strong>Status</strong>
                        </th>
                      <th></th>
                      <th>
                        <strong>Members</strong>
                      </th>
                      <th></th>
                      <th>
                        <strong>sponsor Club</strong>
                      </th>
                      <th></th>
                      
                     
                    </tr>
                  </thead>
                  <tbody>
                    {clubs
                      .filter((club) => club.type !== "SuperAdmin")
                      .map((club, index) => (
                        <tr key={club._id}>

                         <td> <img  width={70} 
                         height={60}  alt="image" src={require("../../../images/clubs/" + club.image) }  /></td>
                          <td>{club.clubname}</td>
                          <td>{club.foundingpresident.firstname}</td>
                          <td></td>
                          <td>{club.email}</td>
                          <td>{club.city}</td>
                          <td>{club.region}</td>
                            <td></td>   
                          <td>
                            <span
                              className={`badge badge-${
                                club.type === "Rotary"
                                  ? "danger"
                                  : club.type === "Rotaract"
                                  ? "info"
                                  : club.type === "Interact"
                                  ? "dark"
                                  : "warning"
                              }`}
                            >
                              {club.type}
                            </span>
                          </td>
                          <td>
                            {club.approved ? (
                              <Badge variant="success light">Approved</Badge>
                            ) : (
                              <Badge
                                variant="warning light"
                                onClick={() =>
                                  swal({
                                    title: "Are you sure?",
                                    text: "Once Approved, user will be able to login !",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then(() =>
                                    axios
                                      .put(
                                        "http://localhost:3000/clubs/approveclub/" +
                                          club._id
                                      )
                                      .then((res) => {
                                        // console.log(res)
                                        if ((res.respone = 200)) {
                                          swal("Club has been approved!", {
                                            icon: "success",
                                          });
                                        } else {
                                          swal("Nothing changed !");
                                        }
                                      })
                                  )
                                }
                              >
                                Pending
                              </Badge>
                            )}
                          </td>
                            <td></td>
                          <td>{club.members.length}</td>
                            <td></td>
                          <td>{club.club}</td>
                          <Badge
                                variant="warning light"
                                onClick={() =>
                                  Swal.fire({
                                    title: "Update",
                                    html:
                                    '<br></br>'+
                                    '<div class="input_wrap">' +
                                    '<input type="text" required value='+club.clubname+' class="form-control" name="clubname">' +
                                    '<label>Club name</label>' +
                                       '</div>'+
                                  '<br></br>'+
                                  '<div class="input_wrap">' +
                                  '<input type="text" required value='+club.email+' class="form-control" name="email">' +
                                  '<label>Email</label>' +
                                '</div>'+
                                '<br></br>'+
                                '<div class="input_wrap">' +
                                '<input type="file"  value='+club.image+' class="form-control" name="image">' +
                                '<label>image</label>' +
                              '</div>',
                                    icon: "info",
                                    buttons: false,
                                    dangerMode: true,
                                    preConfirm: () => {
                                      const clubname = Swal.getPopup().querySelector(
                                        'input[name="clubname"]'
                                      ).value;
                                      const email = Swal.getPopup().querySelector(
                                        'input[name="email"]'
                                      ).value;
                                      const image = Swal.getPopup().querySelector(
                                        'input[name="image"]'
                                      )
                                      const file= image.files[0]
           
                                      if (!clubname || !email || !image ) {
                                         Swal.showValidationMessage('Please fill in all fields');
                                      }
                                      return { clubname: clubname, email: email,  image: file };
                                   }
                                  })
                                  .then((result) => {

                                 console.log(result)
                                    axios
                                      .put(
                                        "http://localhost:3000/clubs/update/" +
                                          club._id,result.value,{
                                            headers: { 
                                              'Content-Type': 'multipart/form-data'
                                            }
                                          }
                                      )
                                      .then((res) => {
                                        // console.log(res)
                                        if ((res.respone = 200)) {
                                          Swal.fire("Club has been updated!", {
                                            icon: "success",
                                          });
                                        } else {
                                          Swal.fire("Nothing changed !");
                                        }
                                      })
                                     } )
                                }
                              >
                                Update
                              </Badge>

                         
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
   
  };
  
  export default Club;
  