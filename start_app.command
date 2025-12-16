#!/bin/bash
cd "$(dirname "$0")/vite-app"
echo "Starting simple-bath-check app..."
# Use Vite's --open flag to open the correct URL automatically
npm run dev -- --open

echo "Server stopped. Press any key to close..."
read -n 1
