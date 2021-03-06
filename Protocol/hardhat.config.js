require('@nomiclabs/hardhat-waffle')
require('hardhat-abi-exporter')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [{ version: '0.8.10' }],
    overrides: {
      'contracts/DaiInstance.sol': {
        version: '0.5.12',
      },
    },
  },
  abiExporter: {
    path: './abis',
    clear: false,
    flat: false,
    only: [],
    spacing: 2,
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
  }
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: "https://eth-mainnet.alchemyapi.io/v2/S9n_HE784KgFNrXjc1NfhySw3Paa4vJK",
  //       blockNumber: 11095000
  //     }
  //   }
  // }
}
