import MetaMaskOnboarding from '@metamask/onboarding'

declare let window: any;

const getUserWalletAddress = async (): Promise<string | undefined> => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return walletAddress[0];
  }
}

const getUserChainId = async (): Promise<string | undefined> => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    return chainId;
  }
}

export {getUserWalletAddress, getUserChainId}