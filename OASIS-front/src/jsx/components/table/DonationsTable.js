import React, { Fragment, useEffect, useState } from "react";

import PageTitle from "../../layouts/PageTitle";

import data from "../table/tableData";
import { Badge, Dropdown, Table } from "react-bootstrap";
import { ethers } from "ethers";
import { ABI } from "../../../contracts/abi";
import Web3 from "web3";

const DonationsTable = () => {
  const [donation, setDonation] = useState([]);
  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const makeContract = async () => {
    const contractAddress = "0xE1402692C768dE0B3C4F706f6cD8217e40286999";

    const contract = new ethers.Contract(
      contractAddress,
      ABI,
      provider.getSigner()
    );
    contract.getAllDonations().then((res) => {
      setDonation(res);
    });
  };

  useEffect(() => {
    makeContract();
    console.log(donation);
  }, []);

  return (
    <div className="h-80">
      <PageTitle activeMenu="Product Order" motherMenu="Shop" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Table responsive size="sm" className="table-responsive-xl mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">
                      <div className="custom-control custom-checkbox ml-1">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkAll"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkAll"
                        ></label>
                      </div>
                    </th>

                    <th className="align-middle">
                      <strong>Donation</strong>
                    </th>
                    <th className="align-middle">
                      <strong>Date</strong>
                    </th>
                    <th className="align-middle">
                      <strong>Donor Address</strong>
                    </th>
                    <th className="align-middle">
                      <strong>Status</strong>
                    </th>
                    <th className="align-middle">
                      <strong>Amount</strong>
                    </th>

                    <th></th>
                  </tr>
                </thead>
                <tbody id="orders">
                  {donation.map((d, i) => (
                    <tr key={i}>
                      {d.map((da, ii) => (
                        <td key={ii}>
                          <div
                            className={`custom-control custom-checkbox checkbox-${
                              da === "Completed"
                                ? "success"
                                : da === "On Hold"
                                ? "secondary"
                                : da === "Pending"
                                ? "warning"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input "
                              id={`checkAll${i}`}
                              required=""
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`checkAll${i}`}
                            ></label>

                            <Badge variant="success">
                              Completed
                              <span className="ml-1 fa fa-check"></span>
                            </Badge>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsTable;
