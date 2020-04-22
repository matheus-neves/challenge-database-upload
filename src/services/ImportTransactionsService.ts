import csvParse from 'csv-parse';

import { getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  file: Express.Multer.File;
}

interface TransactionsCSV {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ file }: Request): Promise<Transaction[]> {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const transactions: TransactionsCSV[] = [];
    const categories: string[] = [];

    const parser = csvParse(file.buffer, {
      columns: true,
      trim: true,
    });

    parser.on('data', line => {
      const { title, type, value, category } = line;

      if (!title || !type || !value) return;

      transactions.push({ title, type, value, category });
      categories.push(category);
    });

    parser.on('error', () => {
      return new AppError('Something wrong with the csv file');
    });

    await new Promise(resolve => parser.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitles = existentCategories.map(
      ({ title }: Category) => title,
    );

    const categoriesTitles = Array.from(
      new Set(
        categories.filter(
          category => !existentCategoriesTitles.includes(category),
        ),
      ),
    );

    const newCategories = await categoriesRepository.create(
      categoriesTitles.map(title => ({ title })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const newTransactions = await transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionsRepository.save(newTransactions);

    return newTransactions;
  }
}

export default ImportTransactionsService;
