// Types of blocks

// All blocks verify that hash of previous is correct, and format is followed
// All info is followed by RSA signature of info (if needed to verify)

// Create account
    // Parameters
        // IP address
        // Public key
    // To verify
        // public key is unique
    // Info format
        // [IP address],[public key]

// Create game
    // Parameters
        // Type of game
        // Team of creating player (white, X's etc)
        // Creator of game IP + public key, proposed player IP + public key
        // ID of game (uuid)
        // Signature
    // To verify:
        // Block signed by creator of game
    // Info format
        // [game],[team],[creator public key],[creator IP address],[proposed public key],[proposed IP address],[gameID],[signature]

// Accept game
    // Parameters
        // Game ID
        // Accepting player's signature = signature of gameID
    // To verify:
        // Game exists
        // Block signed by acceptor
    // Info format
        // [game ID],[signature]

// Declare end
    // Parameters
        // Game ID
        // Winner's IP
    // To verify:
        // Game exists
        // Game state is valid to end
        // IP is in the game
    // Info format
        // [game ID],[winner IP]

// Make move
    // Parameters
        // Move type (Place at 0,2. e2 to e4, etc)
        // Acting player IP
    // to verify:
        // Game exists
        // IP exists
        // Block signed by acting player
        // Move is valid
    // Move format (tic-tac-toe)
        // 0/0 is at bottom left
        // [row]/[col].
    // Info format
        // [move],[IP],[gameID],[signature]