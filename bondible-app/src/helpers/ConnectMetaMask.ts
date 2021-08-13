import MetaMaskOnboarding from '@metamask/onboarding'

declare let window: any

const ConnectMetaMask = async () => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
}

export default ConnectMetaMask
