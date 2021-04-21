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

# Lifecycle of Players and Games
> Before playing a game, nodes must register themselves with the network with the create_account transaction. Currently, every node must be aware of every other node in the network.

> Any node can start a game with any other node, as long as they know the other node's IP address and public RSA key. Once a game is started with the create_game transaction, the opponent must accept it with the accept_game transaction. The first turn belongs to the player who initiated the game. At that point, players take turns making move transactions. The game is finished and cannot be added to when any node (not limited to the players) calls the declare_end transaction.

> Nodes must check the RSA signature included in accept_game and move transactions against their own recorded copy of that player's public key. They also must check the validity of move and declare_end transactions against that game's official rules.

> This node only implements the game tic-tac-toe. As long as there is an agreed upon protocol for the "move" parameter of the move transaction, many other games can be played. For example, it would be possible to implement chess and diplomacy. 


# Proof-of-work
> Currently, the proof-of-work is kept trivial for testing. The hash must contain the sequence "aaa". The hash is of the entire previous block, with the nonce appended to the end. This client generates nonces by iterating an integer, but this is not required by the protocol.