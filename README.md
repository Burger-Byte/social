# Social - Modular Dating App

A modern dating app with a focus on safe, public meetups. Built with modularity and maintainability in mind.

## ⭐ Core Feature: Safe Meetup Suggestions

After matching and chatting, users can schedule meetups at venues that are:
- **Equidistant** from both users (calculates geographic midpoint)
- **Ranked by fairness** (neither user travels significantly more)
- **In public locations** (enhances safety)
- **Pre-selected** (removes the awkward "where should we meet?" conversation)

## Architecture

This is a **monorepo** structure using npm workspaces. Each module is independent and can be developed, tested, and deployed separately.

```
social/
├── apps/
│   ├── backend/          # Node.js backend API
│   └── mobile/           # React Native mobile app (TODO)
├── packages/
│   ├── meetup/           # ⭐ CORE FEATURE (implemented)
│   ├── shared-types/     # TypeScript types (implemented)
│   ├── auth/             # Authentication module
│   ├── matching/         # Matching algorithm module
│   ├── messaging/        # Real-time messaging module
│   ├── profiles/         # User profile management
│   ├── geolocation/      # Location & venue services
│   ├── notifications/    # Push notifications
│   ├── database/         # Database models & migrations
│   └── utils/            # Common utilities
└── infrastructure/       # Docker, K8s, Terraform configs
```

## Tech Stack

- **Frontend**: React Native (cross-platform mobile)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with PostGIS
- **Cache**: Redis
- **Real-time**: Socket.io
- **Auth**: JWT + Firebase Auth
- **Maps**: Google Maps Platform
- **Storage**: AWS S3
- **Infrastructure**: Docker, Kubernetes

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Burger-Byte/social.git
cd social

# Run the quick start script
./quick-start.sh

# Or manually:
npm install
docker-compose up -d
npm run dev:backend
```

Visit `http://localhost:3000/health` to verify the server is running.

## Documentation

- **GETTING_STARTED.md** - Detailed setup guide
- **ARCHITECTURE.md** - System design and diagrams
- **ROADMAP.md** - Development roadmap (6 months to MVP)
- **packages/README.md** - Module documentation

## Module Independence

Each package in `packages/` is:
- **Self-contained**: Has its own dependencies, tests, and documentation
- **Independently testable**: Can be tested without other modules
- **Loosely coupled**: Communicates through well-defined interfaces
- **Replaceable**: Can be swapped out without affecting other modules

## Current Status

✅ **Implemented**:
- Modular architecture setup
- Complete TypeScript type definitions
- Core meetup algorithm (midpoint calculation, venue ranking)
- Express.js backend with all routes defined
- Docker Compose for local development

⏳ **In Progress**:
- Database module
- Geolocation module (Google Maps integration)
- Authentication

🔜 **TODO**:
- Complete all backend modules
- Build React Native mobile app
- Testing & deployment

## Why This Structure?

✅ **Easy Maintenance**: Fix bugs in one module without touching others  
✅ **Simple Troubleshooting**: Issues isolated to specific modules  
✅ **Feature Flexibility**: Add/remove features easily  
✅ **Team Scalability**: Different teams can own different modules  
✅ **Microservices-Ready**: Can deploy modules independently

## License

MIT
