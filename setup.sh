#!/bin/bash

# Smart Hospital AI System - Quick Setup Script
# This script automates the initial setup process

echo "🏥 Smart Hospital AI System - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created from .env.example"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Firebase credentials"
    echo "   Follow the instructions in SETUP.md"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Setup Firebase (see SETUP.md)"
echo "2. Add Firebase credentials to .env.local"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Visit http://localhost:3000"
echo ""
echo "For detailed instructions, see SETUP.md"
echo "=========================================="
