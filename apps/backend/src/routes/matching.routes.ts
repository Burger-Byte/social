import { Router } from 'express';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();

/**
 * Matching Module Routes
 * Handles: Discovery, Swiping, Matches
 * Module: packages/matching
 */

// GET /api/v1/matching/discover
router.get('/discover', asyncHandler(async (req, res) => {
  // Will be implemented by matching module
  res.json({
    success: true,
    data: { message: 'Matching module: discover profiles' }
  });
}));

// POST /api/v1/matching/like/:userId
router.post('/like/:userId', asyncHandler(async (req, res) => {
  // Will be implemented by matching module
  res.json({
    success: true,
    data: { message: 'Matching module: like user' }
  });
}));

// POST /api/v1/matching/pass/:userId
router.post('/pass/:userId', asyncHandler(async (req, res) => {
  // Will be implemented by matching module
  res.json({
    success: true,
    data: { message: 'Matching module: pass on user' }
  });
}));

// GET /api/v1/matching/matches
router.get('/matches', asyncHandler(async (req, res) => {
  // Will be implemented by matching module
  res.json({
    success: true,
    data: { message: 'Matching module: get my matches' }
  });
}));

// DELETE /api/v1/matching/matches/:matchId
router.delete('/matches/:matchId', asyncHandler(async (req, res) => {
  // Will be implemented by matching module
  res.json({
    success: true,
    data: { message: 'Matching module: unmatch' }
  });
}));

export default router;
