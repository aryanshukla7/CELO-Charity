
# Fundraiser

You can fund yourself or your cause by creating new proposals and
people around the world can donate to you or your cause.



## Authors

- [Aryan Shukla](https://www.github.com/aryannewyork)
- [Mohammad Touseef](https://www.github.com/touseef-md)
- [Mudit Jain](https://www.github.com/sigma2345)


## Deployment

To deploy this project
- Firstly, clone the repository to your local machine
- Folder structure should look something like this

    ![FOLDER_STRUCTURE](https://user-images.githubusercontent.com/79625246/175294697-f01a39df-2d7a-41a2-b0df-a4a1ca9c7184.jpg)

- Open the project in VS Code or simply open terminal and cd to the projects folder (CELO-CHARITY in this case).
- Install the node modules using yarn in both the folders, using following commands

```bash
    cd client
    yarn install
    cd..
    cd contracts
    yarn install
```

- After this your project is set up and you can run it by typing following commands in your terminal
    (assuming you are in parent directory, "CELO-CHARITY" in this case)
```bash
    cd client
    yarn run start
```
- This should opwn your browser and run the react application on your localhost.
- After that you should see something like this, on your browser

- Contract Address
``` 0x8132DB79Aed16929816789E396c48e7e299dd5e0
```


    ![FULL_PAGE](https://user-images.githubusercontent.com/79625246/175295941-c432aeac-ea8a-4ffd-a8c2-2922eea0cef8.jpg)

- Now make sure you are on the Alfajores testnet and are connected to the network. Metamask should pop up as your website loads and will ask you to connect your account, you can select any of your account, with sufficient funds for the same. 
 - The Metamask window pop up should look something like this
 
    ![CONNECT_ACCOUNT_METAMASK](https://user-images.githubusercontent.com/79625246/175305923-396c2a51-ecf2-4a48-a8a4-0ca71be4ac23.jpg)

- After you click on next you should be connected to you chosen account on Metamask with Alfajores test network.

- This is the starting page of the application. Here you will find 4 sections:
    
    1) __Raise__ : This is where you canmake proposals to raise money for them.
    1) __Donate__ : This is where people can donate to your proposal, if you give them your proposal ID.
    3) __Withdraw__ : This is where you can withdraw money that your proposal has raised.
    4) __Search__ : This is where you can search the balance in any proposal, using its proposal ID.

- To Make a proposal, simply put in the requested details in the fields and click on the create proposal button. Amount is where you can enter the amount you want to raise, Account address is where you put in your account address, where you want the funds to transferred to, Description is where you put in your cause, your need, anything you'd like to convey to the world and why they should donate you.
- After you put in details it should look something like this.

    ![CREATE_PROPOSAL_INITIAL](https://user-images.githubusercontent.com/79625246/175364454-cd0c7e0c-bc56-4ddb-b1a5-2cfef79c2350.jpg)

- After you click on the "Create Proposal" button, metamask should pop up and ask you to confirm the transaction.

    ![CRAETE_PROPOSAL](https://user-images.githubusercontent.com/79625246/175298043-3e5c13c5-7714-4581-b5d3-2b382bed7c63.jpg)

- Once you confirm the transaction, your proposal is created and now its ready to be funded/donated.

- To fund any proposal simply scroll down to the donate section, or click on the donate tab in the navbar. 
- Something like this should show up and here you can enter the proposal ID you want to fund with the amount that you want to donate.

    ![DONATE_INITIAL](https://user-images.githubusercontent.com/79625246/175364468-0dc23156-52e0-4127-995f-abd1e1021e71.jpg)

- After you click on the "Donate" button, another metamask window should pop up and ask you confirm the transaction, as soon as you click on confirm, you have successfully donated to your desired proposal ID.
- It should look like this

    ![DONATE_METAMASK](https://user-images.githubusercontent.com/79625246/175299300-474b1be2-c051-4931-89d7-d275ec97815e.jpg)

- To Withdraw from your proposal, you can simply scroll down to the withdraw section or click on the withdraw tab on the navbar. Enter your Proposal ID, and make sure that you authorize the trasaction using the same account as you used to make the proposal.

    ![METAMASK_WITHDRAW](https://user-images.githubusercontent.com/79625246/175299813-3c2b4391-00ec-4487-989a-93e9579b3deb.jpg)

- On confirming the transaction, all the funds in your proposal should be transferred to your account.

- To check the balance you can navigate to the search section and enter proposal ID

- Before Withdrawal:

    ![GET_PROPOSAL_AFTER_DONATE](https://user-images.githubusercontent.com/79625246/175300168-b78076e3-9ced-4d21-9d24-e14351c7deb2.jpg)

- After Withdrawal:

    ![GET_PROPOSAL_FINAL](https://user-images.githubusercontent.com/79625246/175300221-79c0a27b-e682-4645-98ae-c35ca41629ad.jpg)

- All these transactions are happening on the CELO (Alfajores testnet). You can track the transactions using the block explorer of the same

    [CELO Alfajores testnet Block Explorer](https://alfajores-blockscout.celo-testnet.org)

- After you search your account or check the contract using it's address, you should see something like this.

    ![BLOCK_EXPLORER-1](https://user-images.githubusercontent.com/79625246/175301098-f056a17c-7ae0-4a3b-9009-2d2cf242ba91.jpg)
    ![BLOCK_EXPLORER-2](https://user-images.githubusercontent.com/79625246/175301105-1b8e4880-f3b1-45bc-8c6b-5313e79a6a60.jpg)
    
 - Verified Contract
    ![BLOCK_EXPLORER-1](https://user-images.githubusercontent.com/79625246/175659814-0dad63fa-a3c4-4c10-ba6b-1e5befbcef8d.jpg)



- __NOTE:__ 
    
    1) Make sure your accounts have sufficient funds to carry out the transactions, if not you can go to any alfajores faucet and fund your account with some test money (CELO).

        [Alfajores Testnet Faucet](https://celo.org/developers/faucet)

    2) The values of amounts are in CELO.
    3) This is a developing project, so expect a lot of changes in the coming time. Right now it is only in its initial stages. We will be adding capabilities to upload pictures or videos to the description section to make your proposal more appealing to the masses, Along with that we are also in the process of adding authentication capability to check the legitimacy of proposals being created for fundraising. Along with that, we are constantly trying to bring changes to the application to better facilitate the user experience.
