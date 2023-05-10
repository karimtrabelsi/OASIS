pragma solidity ^0.8.0;

contract Donations {
uint public totalDonations=0;
uint public confirmedDonations=0;
address payable public donor;
address payable public club;
    
   

    struct Donation {
        uint id;
        string status;
        uint donorid;
        string clubid;
        string donorname;
        string clubname;
        string donormail;
        uint timestamp;
        uint amount;
        address payable donorAddress;
        address payable clubAddress;
    }

    mapping(uint => Donation) public donations;


    modifier onlyPresident(uint _index) {
        require(msg.sender == donations[_index].clubAddress, "Only club president can access this");
        _;
    }

     modifier onlyDonor(uint _index) {
        require(msg.sender == donations[_index].donorAddress, "Only donor can access this");
        _;
    }

     function addDonation( uint _donorId,string memory _clubId,string memory _donorname,string memory _clubname,string memory _donormail, uint _amount, address  _clubAddr) public payable {
        require(msg.sender != _clubAddr,"Invalid address");
        string memory _status="Pending";
        totalDonations ++;
        uint donationId = totalDonations > 0 ? totalDonations - 1 : 0;
        donations[donationId] = Donation(totalDonations,_status,_donorId,_clubId,_donorname,_clubname,_donormail,block.timestamp, _amount, payable(msg.sender), payable(_clubAddr)); 
    }

    function signDonation(uint _index) public onlyDonor(_index) {
        address payable _clubAddress = donations[_index].clubAddress;
        uint _amount = donations[_index].amount;
        _clubAddress.transfer(_amount);
        confirmedDonations ++;
        donations[_index].timestamp=block.timestamp;
        donations[_index].status="Confirmed";
    }

    function getAllDonations() public  view returns (Donation[] memory) {
    Donation[] memory allDonations = new Donation[](totalDonations);
    for (uint i = 0; i < totalDonations; i++) {
        allDonations[i] = donations[i];
    }
    return allDonations;
}
   


}