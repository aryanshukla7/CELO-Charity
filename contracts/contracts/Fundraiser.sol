// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7 ; 


error FUNDME__PROPOSALNOTFOUND() ; 
error FUNDME__PROPOSALFUNDED() ;
error FUNDME_TRANSACTIONFAILED() ;
error FUNDME_NOTRECEIVER() ;  
contract Fundraiser {
    

    enum ProposalStatus{
        INITIATED, 
        COMPLETED, 
        TRANSFERRED
    }

//allowed to transact half amount 
//amount => (amount -= 10)  (amount <0) => direct transfer 
    struct Proposal{
        uint256 id ;
        uint256 amount ; 
        uint256 donatedAmount ;
        address payable receiver ; 
        string description ; //link ipfs data  
        // uint256 deadline ;
        ProposalStatus status ;  
    }

    event proposalCompleted(uint256 indexed proposalId) ;

    uint256 public s_proposalId  ; 
    uint256 public variable = 0 ;
    Proposal[] s_proposals ; 

    constructor(){
        s_proposalId = 0 ; 
    }

    function newProposal(
        uint256 _amount ,
        address payable _receiver, 
        string memory _description 
    ) public {
        Proposal memory _proposal = Proposal(s_proposalId, _amount*(10**18), 0 , _receiver, _description, ProposalStatus.INITIATED) ;
        s_proposalId++ ;
        s_proposals.push(_proposal) ; 
    }

    function FundProposal(
        uint256 _id
        /* uint256 _amount*/ 
    ) public payable 
    {
        if(s_proposals[_id].status == ProposalStatus.COMPLETED){
            variable = 1;
            revert FUNDME__PROPOSALFUNDED() ;
        }
        uint256 _amount = msg.value ; 
        if( _id >= s_proposalId){
            revert FUNDME__PROPOSALNOTFOUND() ;
        }
        s_proposals[_id].donatedAmount += _amount ; 
        if( s_proposals[_id].amount <= s_proposals[_id].donatedAmount ){
            variable = 2;
            s_proposals[_id].amount = 0 ; 
            s_proposals[_id].status = ProposalStatus.COMPLETED ;
            emit proposalCompleted(_id) ; 
        }
    }

    function withdraw(uint256 _id) public payable{
        if(_id >= s_proposalId){
            revert FUNDME__PROPOSALNOTFOUND(); 
        }
        if(msg.sender != s_proposals[_id].receiver){
            revert FUNDME_NOTRECEIVER() ;
        }
        (bool success, ) = payable(msg.sender).call{value: s_proposals[_id].donatedAmount}("") ;
        if(!success){
            revert FUNDME_TRANSACTIONFAILED() ;
        }
        s_proposals[_id].status = ProposalStatus.TRANSFERRED ;  
        emit proposalCompleted(_id); 
    }

    function getProposal(uint256 index) public view returns(Proposal memory){
        return s_proposals[index] ; 
    }
}