import MetaMaskOnboarding from '@metamask/onboarding';

declare let window: any;

export const ConnectMetaMask = async () => {
    
    if(MetaMaskOnboarding.isMetaMaskInstalled()){
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

}