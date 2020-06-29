/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

async function main() {
    // try {

    //     // Create a new file system based wallet for managing identities.
    //     const walletPath = path.join(process.cwd(), 'wallet');
    //     const wallet = new FileSystemWallet(walletPath);
    //     console.log(`Wallet path: ${walletPath}`);

    //     // Create a new gateway for connecting to our peer node.
    //     const gateway = new Gateway();
    //     await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

    //     const network = await gateway.getNetwork('mychannel');
    //     console.log(network);
    //     return ;



    // } catch (error) {
    //     console.error(`Failed to register user "user1": ${error}`);
    //     process.exit(1);
    // }

    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Collect input parameters
        // user: who initiates this query, can be anyone in the wallet
        // filename: the file to be validated
        const user = process.argv[2];

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
        // await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });



        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        console.log(network);
        return ;

        // Get the contract from the network.
        const contract = network.getContract('docrec');

        // Submit the specified transaction.
        await contract.submitTransaction('createDocRecord', hashToAction, sigValueBase64);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
