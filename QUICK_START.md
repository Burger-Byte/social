# 🚀 Quick Start Guide

The "social" dating app is a modular TypeScript project with a unique safety-focused meetup feature.

## ✅ What's Already on GitHub

- ✅ README.md
- ✅ Project structure setup script  
- ✅ Core meetup service (THE KEY FEATURE!)

## 📦 Getting Started on Windows

### Option 1: Clone and Add Files Manually (Recommended for Learning)

```bash
# 1. Clone the repository
git clone https://github.com/Burger-Byte/social.git
cd social

# 2. Run the complete project generator
# Download this file from the repo: COMPLETE_PROJECT_GENERATOR.md
# Follow the instructions in that file to create all files

# 3. Install dependencies
npm install

# 4. Start Docker services (requires Docker Desktop on Windows)
docker-compose up -d

# 5. Set up environment
copy .env.example apps\backend\.env
# Edit apps\backend\.env with your API keys

# 6. Start the backend
npm run dev:backend

# 7. Verify it works
# Open browser to: http://localhost:3000/health
```

### Option 2: Complete Archive Download (Coming Soon)

I'll create a single downloadable archive with all files that you can extract on Windows.

## 📂 Project Structure You'll Create

```
social/
├── package.json                    # Root package with workspaces
├── .gitignore                      # Git ignore rules
├── docker-compose.yml              # PostgreSQL + Redis
├── .env.example                    # Environment variables template
│
├── apps/
│   └── backend/                    # Express.js API
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts           # Main server file
│           ├── middleware/
│           │   ├── error.middleware.ts
│           │   └── logger.middleware.ts
│           └── routes/
│               ├── auth.routes.ts
│               ├── profile.routes.ts
│               ├── matching.routes.ts
│               ├── messaging.routes.ts
│               └── meetup.routes.ts
│
└── packages/
    ├── shared-types/              # TypeScript type definitions
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    │
    └── meetup/                    # ⭐ CORE FEATURE  
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts
            └── services/
                └── meetup.service.ts  # ✅ Already on GitHub!
```

## 🎯 Core Feature: Meetup Service

The meetup service (already pushed to GitHub!) includes:

✅ **Midpoint Calculation**: Finds geographic center between two users  
✅ **Distance Calculation**: Uses Haversine formula for accuracy  
✅ **Fairness Ranking**: Ranks venues so neither user travels way more  
✅ **Venue Suggestion**: Structure ready for Google Maps integration  
✅ **Check-in System**: Track when users arrive at meetup  

**View it here**: [packages/meetup/src/services/meetup.service.ts](https://github.com/Burger-Byte/social/blob/main/packages/meetup/src/services/meetup.service.ts)

## 📝 Next Steps

1. **Get all the files**: I'll create a complete file generator next
2. **Set up your environment**: Get API keys for:
   - Google Maps API (for venue search)
   - AWS (for photo storage)
   - Firebase (for auth & notifications)
3. **Build the database module**: Connect to PostgreSQL
4. **Implement geolocation**: Integrate Google Maps
5. **Start the mobile app**: React Native

## 🔑 API Keys You'll Need

- **Google Maps Platform**: https://console.cloud.google.com/apis
- **AWS S3**: https://aws.amazon.com/s3/
- **Firebase**: https://console.firebase.google.com/

## 💡 Key Commands

```bash
# Install everything
npm install

# Start backend (dev mode with hot reload)
npm run dev:backend

# Build all packages
npm run build:all

# Run tests
npm run test:all
```

## 🐛 Troubleshooting on Windows

**Issue**: `docker-compose` not found  
**Fix**: Install Docker Desktop for Windows

**Issue**: `npm install` fails  
**Fix**: Run PowerShell as Administrator

**Issue**: Can't connect to database  
**Fix**: Ensure Docker Desktop is running, then run `docker-compose up -d`

**Issue**: Port 3000 in use  
**Fix**: Change PORT in `.env` file or kill the process using that port

## 📚 Documentation

- **ARCHITECTURE.md** - System design (coming soon)
- **ROADMAP.md** - Development plan (coming soon)
- **packages/README.md** - Module details (coming soon)

## 🎉 What Makes This Special

1. **True Modularity**: Each package is independent
2. **Safety First**: Public meetup locations only
3. **Fair Travel**: Neither person goes way further
4. **Production Ready**: TypeScript, Docker, proper architecture
5. **Your Expertise**: Built for K8s deployment (your strength!)

---

**Repository**: https://github.com/Burger-Byte/social  
**Created**: January 2026  
**Status**: Foundation complete, ready for development

Need help? Check the issues tab or create a new one!
