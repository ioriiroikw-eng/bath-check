#!/bin/bash
cd "$(dirname "$0")/vite-app"
echo "Starting simple-bath-check app..."
# Wait a bit then open standard browser if vite doesn't
# open http://localhost:5173
npm run dev
