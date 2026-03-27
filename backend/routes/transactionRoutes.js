import express from 'express';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to protect all transaction routes
router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(addTransaction);

router.get('/summary', getTransactionSummary);

router.route('/:id')
  .patch(updateTransaction)
  .delete(deleteTransaction);

export default router;
