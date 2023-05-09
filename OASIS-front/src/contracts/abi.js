export const ABI = [
  {
    inputs: [],
    name: "club",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "confirmedDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "donations",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "donorid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "clubid",
        type: "string",
      },
      {
        internalType: "string",
        name: "donorname",
        type: "string",
      },
      {
        internalType: "string",
        name: "clubname",
        type: "string",
      },
      {
        internalType: "string",
        name: "donormail",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "donorAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "clubAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "donor",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "totalDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_donorId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_clubId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_donorname",
        type: "string",
      },
      {
        internalType: "string",
        name: "_clubname",
        type: "string",
      },
      {
        internalType: "string",
        name: "_donormail",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_clubAddr",
        type: "address",
      },
    ],
    name: "addDonation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "signDonation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllDonations",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "donorid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "clubid",
            type: "string",
          },
          {
            internalType: "string",
            name: "donorname",
            type: "string",
          },
          {
            internalType: "string",
            name: "clubname",
            type: "string",
          },
          {
            internalType: "string",
            name: "donormail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "donorAddress",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "clubAddress",
            type: "address",
          },
        ],
        internalType: "struct Donations.Donation[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
