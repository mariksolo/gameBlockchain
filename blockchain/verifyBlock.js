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
        // ID of game = creating player's signature of info
    // To verify:
        // Block signed by creator of game
    // Info format
        // [game],[team],[IP address],[creator public key],[creator IP address],[proposed public key],[proposed IP address]

// Accept game
    // Parameters
        // Game ID
        // Accepting player IP + public key
    // To verify:
        // Game exists
        // Block signed by acceptor
    // Info format
        // [game ID],[IP],[public key]

// Declare end
    // Parameters
        // Game ID
        // Winner's IP and public key
    // To verify:
        // Game state is valid to end
    // Info format
        // [game ID],[winner IP],[winner public key]

// Make move
    // Parameters
        // Move type (Place at 0,2. e2 to e4, etc)
        // Acting player IP + public key
    // to verify:
        // Block signed by acting player
        // Move is valid
    // Move format (tic-tac-toe)
        // 0,0 is at bottom left
        // [row],[col].
    // Info format
        // [move],[IP],[public key]

