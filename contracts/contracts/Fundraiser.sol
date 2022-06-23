// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol" ; 

error FUNDME__PROPOSALNOTFOUND();
error FUNDME__PROPOSALFUNDED();
error FUNDME_TRANSACTIONFAILED();
error FUNDME_NOTRECEIVER();

contract Fundraiser is ReentrancyGuard {
    using SafeMath for uint256;

    enum ProposalStatus {
        INITIATED,
        COMPLETED,
        TRANSFERRED
    }

    //allowed to transact half amount
    //amount => (amount -= 10)  (amount <0) => direct transfer
    struct Proposal {
        uint256 id;
        uint256 amount;
        uint256 donatedAmount;
        address payable receiver;
        string description; //link ipfs data
        ProposalStatus status;
    }

    event proposalInitiated(
        uint256 indexed id ,
        address indexed proposer, 
        uint256 indexed _amount
    ) ;
    event proposalCompleted(
        uint256 indexed proposalId
    );

    event proposalDonated(
        address indexed receiver ,
        uint256 indexed _id
    );

    uint256 public s_proposalId;
    Proposal[] s_proposals;

    constructor() {
        s_proposalId = 0;
    }

    function newProposal(uint256 _amount, address payable _receiver, string memory _description) public {
        _amount = _amount.mul(10**18) ; 
        Proposal memory _proposal = Proposal(
            s_proposalId,
            _amount,
            0,
            _receiver,
            _description,
            ProposalStatus.INITIATED
        );

        s_proposalId++;
        s_proposals.push(_proposal);
        emit proposalInitiated(_proposal.id, _proposal.receiver, _amount) ; 
    }

    function FundProposal(uint256 _id) public payable
    {
        if (s_proposals[_id].status != ProposalStatus.INITIATED) {
            revert FUNDME__PROPOSALFUNDED();
        }
        uint256 _amount = msg.value;
        if (_id >= s_proposalId) {
            revert FUNDME__PROPOSALNOTFOUND();
        }
        s_proposals[_id].donatedAmount = s_proposals[_id].donatedAmount.add(_amount) ;
        if (s_proposals[_id].amount <= s_proposals[_id].donatedAmount) {
            s_proposals[_id].status = ProposalStatus.COMPLETED;
            emit proposalCompleted(_id);
        }
    }

    function withdraw(uint256 _id) nonReentrant public {
        if (_id >= s_proposalId) {
            revert FUNDME__PROPOSALNOTFOUND();
        }
        if (msg.sender != s_proposals[_id].receiver) {
            revert FUNDME_NOTRECEIVER();
        }
        s_proposals[_id].status = ProposalStatus.TRANSFERRED;
        (bool success, ) = payable(msg.sender).call{
            value: s_proposals[_id].donatedAmount
        }("");
        if (!success) {
            revert FUNDME_TRANSACTIONFAILED();
        }
        emit proposalDonated(msg.sender, _id);
    }

    function getProposal(uint256 index) public view returns (Proposal memory) {
        return s_proposals[index];
    }
}