# Damn Vulnerable DeFi


### Challenge #1 - Unstoppable
There's a lending pool with a million DVT tokens in balance, offering flash loans for free.
If only there was a way to attack and stop the pool from offering flash loans ...
You start with 100 DVT tokens in balance.

### Challenge #2 - Naive receiver
There's a lending pool offering quite expensive flash loans of Ether, which has 1000 ETH in balance.
You also see that a user has deployed a contract with 10 ETH in balance, capable of interacting with the lending pool and receiving flash loans of ETH.
Drain all ETH funds from the user's contract. Doing it in a single transaction is a big plus ;)

### Challenge #3 - Truster
More and more lending pools are offering flash loans. In this case, a new pool has launched that is offering flash loans of DVT tokens for free.
Currently the pool has 1 million DVT tokens in balance. And you have nothing.
But don't worry, you might be able to steal them all from the pool.

### Challenge #4 - Side entrance
A surprisingly simple lending pool allows anyone to deposit ETH, and withdraw it at any point in time.
This very simple lending pool has 1000 ETH in balance already, and is offering free flash loans using the deposited ETH to promote their system.
You must steal all ETH from the lending pool.

### Challenge #5 - The rewarder
There's a pool offering rewards in tokens every 5 days for those who deposit their DVT tokens into it.
Alice, Bob, Charlie and David have already deposited some DVT tokens, and have won their rewards!
You don't have any DVT tokens. Luckily, these are really popular nowadays, so there's another pool offering them in free flash loans.
In the upcoming round, you must claim all rewards for yourself.

### Challenge #6 - Selfie
A new cool lending pool has launched! It's now offering flash loans of DVT tokens.
Wow, and it even includes a really fancy governance mechanism to control it.
What could go wrong, right ?
You start with no DVT tokens in balance, and the pool has 1.5 million. Your objective: steal them all.

### Challenge #7 - Compromised
While poking around a web service of one of the most popular DeFi projects in the space, you get a somewhat strange response from their server. This is a snippet:

          HTTP/2 200 OK
          content-type: text/html
          content-language: en
          vary: Accept-Encoding
          server: cloudflare
          4d 48 68 6a 4e 6a 63 34 5a 57 59 78 59 57 45 30 4e 54 5a 6b 59 54 59 31 59 7a 5a 6d 59 7a 55 34 4e 6a 46 6b 4e 44 51 34 4f 54 4a 6a 5a 47 5a 68 59 7a 42 6a 4e 6d 4d 34 59 7a 49 31 4e 6a 42 69 5a 6a 42 6a 4f 57 5a 69 59 32 52 68 5a 54 4a 6d 4e 44 63 7a 4e 57 45 35
          4d 48 67 79 4d 44 67 79 4e 44 4a 6a 4e 44 42 68 59 32 52 6d 59 54 6c 6c 5a 44 67 34 4f 57 55 32 4f 44 56 6a 4d 6a 4d 31 4e 44 64 68 59 32 4a 6c 5a 44 6c 69 5a 57 5a 6a 4e 6a 41 7a 4e 7a 46 6c 4f 54 67 33 4e 57 5a 69 59 32 51 33 4d 7a 59 7a 4e 44 42 69 59 6a 51 34
        
A related on-chain exchange is selling (absurdly overpriced) collectibles called "DVNFT", now at 999 ETH each
This price is fetched from an on-chain oracle, and is based on three trusted reporters: 
```0xA73209FB1a42495120166736362A1DfA9F95A105,0xe92401A4d3af5E446d93D11EEc806b1462b39D15 ```
and 
```0x81A5D6E50C214044bE44cA0CB057fe119097850c```
You must steal all ETH available in the exchange.

### Challenge #8 - Puppet
There's a huge lending pool borrowing Damn Valuable Tokens (DVTs), where you first need to deposit twice the borrow amount in ETH as collateral. The pool currently has 10000 DVTs in liquidity.
There's a DVT market opened in an Uniswap v1 exchange, currently with 10 ETH and 10 DVT in liquidity.
Starting with 100 ETH and 100 DVTs in balance, you must steal as many tokens as possible from the lending pool. And at the end of the attack, your ETH balance shouldn't have decreased.

