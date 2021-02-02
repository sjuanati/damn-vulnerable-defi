const { ether, balance } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

const SideEntranceLenderPool = contract.fromArtifact('SideEntranceLenderPool');
const AttackerSideEntrance = contract.fromArtifact('AttackerSideEntrance');

const { expect } = require('chai');

describe('[Challenge] Side entrance', function () {

    const [deployer, deployer2, attacker, ...otherAccounts] = accounts;

    const ETHER_IN_POOL = ether('10');

    before(async function () {
        /** SETUP SCENARIO */
        this.pool = await SideEntranceLenderPool.new({ from: deployer2 });
        
        await this.pool.deposit({ from: deployer2, value: ETHER_IN_POOL });

        this.attackerInitialEthBalance = await balance.current(attacker);

        expect(
            await balance.current(this.pool.address)
        ).to.be.bignumber.equal(ETHER_IN_POOL);
    });

    it('Exploit', async function () {
        this.attack = await AttackerSideEntrance.new({from: attacker});
        await this.attack.attack(this.pool.address, {from: attacker});
    });

    after(async function () {
        /** SUCCESS CONDITIONS */
        expect(
            await balance.current(this.pool.address)
        ).to.be.bignumber.equal('0');
        
        // Not checking exactly how much is the final balance of the attacker,
        // because it'll depend on how much gas the attacker spends in the attack
        // If there were no gas costs, it would be balance before attack + ETHER_IN_POOL
        expect(
            await balance.current(attacker)
        ).to.be.bignumber.gt(this.attackerInitialEthBalance);
    });
});
