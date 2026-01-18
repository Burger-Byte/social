#!/bin/bash
# Social Dating App - One-Click Setup Script
# Run this to create the entire project structure

echo "🚀 Creating Social Dating App project structure..."

# Clone or ensure you're in the right directory
# git clone https://github.com/Burger-Byte/social.git
# cd social

# Create directory structure
mkdir -p apps/backend/src/{middleware,routes}
mkdir -p packages/{shared-types,meetup,auth,matching,messaging,profiles,geolocation,notifications,database,utils}/src
mkdir -p packages/meetup/src/services

echo "✅ Directories created!"
echo ""
echo "📝 Next: Copy the code files from the repository into their locations"
echo "   Then run: npm install"
echo ""
