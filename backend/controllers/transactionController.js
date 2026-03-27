import Transaction from '../models/Transaction.js';

// @desc    Get all transactions for the user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body;

    // Basic validation
    if (!title || !amount || !type || !category) {
      res.status(400);
      throw new Error('Please all required fields: title, amount, type, category');
    }

    if (!['income', 'expense'].includes(type.toLowerCase())) {
        res.status(400);
        throw new Error('Type must be either "income" or "expense"');
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount: Number(amount),
      type: type.toLowerCase(),
      category,
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a transaction
// @route   PATCH /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Ensure the logged in user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized to update this transaction');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Ensure the logged in user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized to delete this transaction');
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get summary of transactions
// @route   GET /api/transactions/summary
// @access  Private
export const getTransactionSummary = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      message: 'Transaction summary calculated successfully',
      data: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
  } catch (error) {
    next(error);
  }
};
