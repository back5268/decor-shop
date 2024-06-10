import { getListOrderMd, getListProductMd } from '@models';
import moment from 'moment';

export const getSummary = async (req, res) => {
  try {
    let { fromDate, toDate } = req.query;
    const where = {};
    if (!(fromDate && toDate)) {
      const date = new Date();
      toDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0, 0, 0);
    }
    if (fromDate && toDate) where.$and = [{ time: { $gte: fromDate } }, { time: { $lt: toDate } }];
    const products = await getListProductMd();
    const orders = await getListOrderMd(where);
    let number = 0,
      numberDiy = 0,
      number3D = 0,
      numberTdiy = 0;
    let total = 0,
      totalDiy = 0,
      total3D = 0,
      totalTdiy = 0;
    const dataz = [];
    orders.forEach((order) => {
      const data = order.productInfo;
      const date = moment(order.time).format('DD/MM/YYYY');
      const index = dataz.findIndex((da) => da.date === date);
      if (index >= 0) dataz[index].total += order.total;
      else dataz.push({ date, total: order.total });

      if (data?.length > 0) {
        data.forEach((datum) => {
          number += datum.quantity;
          const product = products.find((p) => p.code === datum.code);
          if (product?.type === 'diy') {
            numberDiy += datum.quantity;
            totalDiy += datum.quantity * datum.price;
          }
          if (product?.type === '3d') {
            number3D += datum.quantity;
            total3D += datum.quantity * datum.price;
          }
          if (product?.type === 't-diy') {
            numberTdiy += datum.quantity;
            totalTdiy += datum.quantity * datum.price;
          }
        });
      }
      total += order.total;
    });

    const start = moment(fromDate);
    const end = moment(toDate);
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays() + 1;
    const arr = new Array(days).fill(null);
    const newData = []
    arr.forEach((a, index) => {
      const date = start.clone().add(index, 'days').format('DD/MM/YYYY');
      const i = dataz.findIndex((d) => d.date === date);
      if (i < 0) newData.push({ date, total: 0 });
      else newData.push({ ...dataz[i] })
    });

    res.json({ number, numberDiy, number3D, numberTdiy, total, totalDiy, totalTdiy, total3D, dataz: newData });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
