<h1 align="center">gameblockchain</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/mariksolo/gameBlockchain" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/solomonik" target="_blank">
    <img alt="Twitter: solomonik" src="https://img.shields.io/twitter/follow/solomonik.svg?style=social" />
  </a>
</p>

## Description
> A client to play board games over a cryptographically protected and verifiable blockchain. 


## Why?
> A blockchain protocol like gameBlockchain may be used to preserve the authority of online chess tournaments. When online tournaments are held by a central authority, that authority may change moves and outcomes for its own benefit. If tournament participants instead used a blockchain client to play, it would be more difficult to rig or tamper with the results. 

> The ultimate purpose of this project, however, was for me to learn about blockchains. There is no gameBlockchain network available for anyone to use, or any alternate clients. The current client implementation is also easy to trick into accepting invalid blocks, and the protocol itself likely has gaping security holes. The primary missing pieces of the blockchain are that the proof-of-work is too easy to produce, and the blockchain is installed in full on every node rather than distributed over the network. 

&nbsp;

# Blockchain Structure
> The blockchain is composed of a list of blocks in a .txt file, each separated by a newline character. Every block contains a single "transaction," which represents actions such as starting a game or making a move in a game. 

> There are three parts of every block:
- The hash of the previous block.
- A nonce for the hash (value appended to previous block before hash)
- Information associated with the transaction, such as details of a move and RSA public keys.

> Every part is separated by a "]" like so:
```sh
Ql+Brz59OsStyVVKhkH7Wc+FfNcIFSnjaaaZAvzUgiU=]11973]create_game,tic_tac_toe,O,-----BEGIN RSA PUBLIC KEY-----
MEgCQQDzx5DKnUMbwXjpqFBaL9VV7hJKmMVny6JD6bFQ8Ypp01CZ8/Ix9bITlxYu
t0FNRGfaTaaUKvW0c7J+rKd/7MgdAgMBAAE=
-----END RSA PUBLIC KEY-----,127.0.0.1,-----BEGIN RSA PUBLIC KEY-----
MEgCQQC3y/OY1CfR5mZG+94gQS1ZA7DHIZxTG5CkhLI5QdBVxPQcFNK7eGloLRzG
T1mToX6Y+NtIsGFRuppVFRNe6XZZAgMBAAE=
-----END RSA PUBLIC KEY-----,54.162.7.224,27450d19-63d6-453c-8e94-d5767dad1e6c,0150145bf1a8ae82ebc96011b2c78f2dbfa50ba9bcf24c679115a654b6eb49c481b33855a43f6417275011ed41f161c20fe9399ab9e015df0700493ddec250bd]
```
> Blocks can contain newline characters within them, like above.

## Protocol Documentation
https://github.com/mariksolo/gameBlockchain/blob/main/DOCUMENTATION.md


## Install
```sh
git clone https://github.com/mariksolo/gameBlockchain
npm install
```

## Usage
```sh
npm run deploy
```

## Author

👤 **Mark Solomonik**

* Twitter: [@solomonik](https://twitter.com/solomonik)
* Github: [@mariksolo](https://github.com/mariksolo)