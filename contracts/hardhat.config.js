require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: '.env'});
// require('hardhat-deploy');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// Prints the Celo accounts associated with the mnemonic in .env
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "alfajores",
  networks: {
    localhost: {
        url: "http://127.0.0.1:8545"
    },
    alfajores: {
      url: "https://celo-alfajores--rpc.datahub.figment.io/apikey/" + process.env.API_KEY + "/",
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  solidity: "0.8.7",
};