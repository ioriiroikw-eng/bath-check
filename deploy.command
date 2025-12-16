#!/bin/bash
# Move to script directory
cd "$(dirname "$0")"

echo "Building Vite App..."
cd vite-app
npm run build

echo "Deploying to root..."
# Copy build artifacts to root, overwriting existing files
cp -R dist/* ../

echo "Built and copied to root!"
echo "Now you can commit and push these changes to GitHub."
echo "Press any key to close..."
read -n 1
