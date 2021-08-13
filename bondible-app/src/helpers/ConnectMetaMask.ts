import MetaMaskOnboarding from '@metamask/onboarding'

declare let window: any;

const getUserWalletAddress = async (): Promise<string | undefined> => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // console.log(walletAddress[0]);
    return walletAddress;
  }
}

const getUserChainId = async (): Promise<string | undefined> => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    // console.log(chainId);
    return chainId;
  }
}

export {getUserWalletAddress, getUserChainId}