import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const findType = type === 'income' ? 'income' : 'outcome';

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance().total - value;

      if (balance < 0) {
        throw new Error(
          'Cannot add transaction. The balance will be negative.',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: findType,
    });

    return transaction;
  }
}

export default CreateTransactionService;
