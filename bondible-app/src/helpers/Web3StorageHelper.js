import {Web3Storage} from 'web3.storage'

const getAccessToken = () => {
    return process.env.REACT_APP_WEB3_STORAGE_TOKEN;
}

const makeStorageClient = () => {
    return new Web3Storage({token: getAccessToken()});
}

const createFiles = (bondId, blob) => {
    const blob = new Blob([blob], {type: 'image/png'});
    const fileName = 'bond-certificate' + bondId.toString();
    const file = new File(blob, fileName);
    return File;
}

const web3StorageHelper = async (bondId, blob) => {
    const file = createFiles(bondId, blob);
    const client = makeStorageClient();
    const cid = await client.put(file);
    return cid
}

export default web3StorageHelper;
