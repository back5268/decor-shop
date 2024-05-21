import { listTransactionValid } from '@lib/validation';
import { countListTransactionMd, getListTransactionMd } from '@models';
import { validateData } from '@utils';

export const getListTransaction = async (req, res) => {
  try {
    const { error, value } = validateData(listTransactionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, fromDate, toDate } = value;
    const where = {};
    if (fromDate) where.createdAt = { $gte: fromDate };
    if (toDate) {
      if (!where.createdAt) where.createdAt.$lte = toDate;
    }
    const documents = await getListTransactionMd(where, page, limit);
    const total = await countListTransactionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
