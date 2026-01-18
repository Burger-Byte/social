import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

// Import module routers
import authRouter from './routes/auth.routes';
import profileRouter from './routes/profile.routes';
import matchingRouter from './routes/matching.routes';
import messagingRouter from './routes/messaging.routes';
import meetupRouter from './routes/meetup.routes';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';

// Load environment variables
dotenv.config();

class App {
  public app: Application;
  public server: any;
  public io: SocketServer;
  private port: number;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
      }
    });
    this.port = parseInt(process.env.PORT || '3000', 10);

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeWebSocket();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }));

    // Logging
    this.app.use(morgan('dev'));
    this.app.use(requestLogger);

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
  }

  private initializeRoutes(): void {
    const apiPrefix = '/api/v1';

    // Module routes - each module is independently mounted
    this.app.use(`${apiPrefix}/auth`, authRouter);
    this.app.use(`${apiPrefix}/profiles`, profileRouter);
    this.app.use(`${apiPrefix}/matching`, matchingRouter);
    this.app.use(`${apiPrefix}/messages`, messagingRouter);
    this.app.use(`${apiPrefix}/meetups`, meetupRouter);

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Route not found'
        }
      });
    });
  }

  private initializeWebSocket(): void {
    // WebSocket connection handling (for real-time messaging)
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });

      // Module-specific socket handlers will be added here
      // This keeps the main file clean - handlers are in respective modules
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${this.port}/api/v1`);
      console.log(`💓 Health: http://localhost:${this.port}/health`);
    });
  }
}

// Initialize and start server
const app = new App();
app.listen();

export default app;
