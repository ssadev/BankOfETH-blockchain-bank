pragma solidity 0.4.25;

contract Bank{
    
    int bal;
    constructor() public{
        bal=1;
    }
    
    function getBalance() view public returns(int)
    {
        return bal;
    }
    function deposit(int amt) public{
        bal = bal+amt;
    }
    function withdraw(int amt) public{
        if(amt < bal){
            bal = bal-amt;
        }
    }
}
