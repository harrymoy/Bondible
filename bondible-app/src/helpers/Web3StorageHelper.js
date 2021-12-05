import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const getAccessToken = () => {
    return process.env.REACT_APP_WEB3_STORAGE_TOKEN;
}

const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() });
}

const createFiles = (company, blob) => {
    const theBlob = new Blob([blob], { type: 'application/pdf' });
    const fileName = 'bond-certificate' + company.toString();
    const file = new File(theBlob, fileName);
    return file;
}

const web3StorageHelper = async (company, blob) => {
    const file = createFiles(company, blob);
    const client = makeStorageClient();
    const cid = await client.put(file);
    return cid
}

export default web3StorageHelper;
