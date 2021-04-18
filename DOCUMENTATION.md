

# Blockchain Structure
> The blockchain is composed of a list of blocks in a .txt file, each separated by a newline character. Every block contains a single "transaction," which represents actions such as starting a game or making a move in a game. 

> There are three parts of every block:
- The hash of the previous block.
- A timestamp (entirely decorative, is not used or verified).
- Information associated with the transaction, such as details of a move and RSA public keys.

> Every part is separated by a "]" like so:
```sh
Z8jS5xsftILJZCJGnNnBKPbz56t1NOVK4/WY8kKOAZU=]1618700286]create_account,54.224.157.143,-----BEGIN RSA PUBLIC KEY-----
MEgCQQC/7kk6z31/Ily+bIPpxh5cCkPCF9GD+/mYxxSHj+OnFAJO3nhvjdC0eONl
h3WqI5PCbkjHSH+bLZOgznuNgZ+hAgMBAAE=
-----END RSA PUBLIC KEY-----]
```
> Blocks can contain newline characters within them, like above.

&nbsp;

# Local data to maintain

<table>
   <thead>
      <tr>
         <th>Filename</th>
         <th>Contents</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>blockchain.txt</td>
         <td>Entirety of blockchain</td>
      </tr>
      <tr>
         <td>ip.txt</td>
         <td>Public IP address that other nodes can access</td>
      </tr>
      <tr>
         <td>knownNodes.txt</td>
         <td>IP addresses and public keys of other nodes</td>
      </tr>
      <tr>
         <td>publicKey.txt</td>
         <td>RSA public key</td>
      </tr>
      <tr>
         <td>privateKey.txt</td>
         <td>RSA private key</td>
      </tr>
   </tbody>
</table>

&nbsp;

# Transaction Information Structure
> A transaction is a list of items separated by commas, like so from the above example of a block:
```sh
create_account,54.224.157.143,-----BEGIN RSA PUBLIC KEY-----
MEgCQQC/7kk6z31/Ily+bIPpxh5cCkPCF9GD+/mYxxSHj+OnFAJO3nhvjdC0eONl
h3WqI5PCbkjHSH+bLZOgznuNgZ+hAgMBAAE=
-----END RSA PUBLIC KEY-----
```

> The first item is the type of the transaction, the following are paramaters for that transaction.

## Types of Transactions
<table>
   <thead>
      <tr>
         <th>Type</th>
         <th>Purpose</th>
         <th>Parameters</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>create_account</td>
         <td>Called by a node to indicate its presence on the network and give out its public RSA key.</td>
         <td>[IP address],[public key]</td>
      </tr>
      <tr>
         <td>create_game</td>
         <td>Proposes a game with another node.</td>
         <td>[game],[creator team],[creator public key],[creator IP address],[proposed player public key],[proposed player IP address],[gameID],[RSA signature]</td>
      </tr>
      <tr>
         <td>accept_game</td>
         <td>Accepts a proposed game, initiating it.</td>
         <td>[game ID],[RSA signature]</td>
      </tr>
      <tr>
         <td>move</td>
         <td>Make a move or other action in an initiated game.</td>
         <td>[move],[IP],[gameID],[RSA signature]</td>
      </tr>
      <tr>
         <td>declare_end</td>
         <td>Called by a node not in the game to declare victory or a draw.</td>
         <td>[game ID],[winner IP]</td>
      </tr>
   </tbody>
</table>