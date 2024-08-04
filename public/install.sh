REPO_URL="https://github.com/aman1117/shc-cli.git"
REPO_DIR=$(mktemp -d)

if ! command -v rustc &> /dev/null; then
    echo "Rust is not installed. Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env || { echo "Failed to source cargo environment"; exit 1; }
fi

echo "Cloning the shc repository..."
git clone --depth 1 "$REPO_URL" "$REPO_DIR" || { echo "Failed to clone repository"; exit 1; }

echo "Installing shc..."
cd "$REPO_DIR" || { echo "Failed to change directory to repository"; exit 1; }
cargo install --path . || { echo "Failed to install shc"; exit 1; }

cd .. || { echo "Failed to change directory"; exit 1; }

echo "Cleaning up..."
rm -rf "$REPO_DIR" || { echo "Failed to remove repository directory"; exit 1; }

echo "shc installed successfully!"

