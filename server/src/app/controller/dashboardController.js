import { Product } from '@models';

export const getSummary = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query
    const where = {}
    if (fromDate) where.createdAt = { $gte: fromDate };
    if (toDate) {
      if (!where.createdAt) where.createdAt.$lte = toDate;
    }
    const orderData = await Product.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          },
          $match: where
        }
      ]);
    const productData = await Product.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        },
        $match: where
      }
    ]);
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
