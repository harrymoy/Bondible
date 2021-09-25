import MetaMaskOnboarding from '@metamask/onboarding'

declare let window: any;

const getWalletData = async (): Promise<Array<string> | undefined> => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    let dataList = new Array<string>();
    const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    dataList.push(walletAddress[0], chainId);
    return dataList;
  }
}

export {getWalletData}