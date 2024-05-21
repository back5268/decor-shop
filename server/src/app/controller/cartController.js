import { addToCartValid, deleteProductCartValid } from '@lib/validation';
import { addCartMd, countListCartMd, deleteCartMd, getDetailCartMd, getListCartMd } from '@models';
import { validateData } from '@utils';

export const getListCartByUser = async (req, res) => {
  try {
    res.json({
      status: true,
      data: await getListCartMd({ by: req.userInfo?._id }, false, false, [
        { path: 'product', select: '_id name code price sale avatar quantity' }
      ])
    });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListCart = async (req, res) => {
  try {
    const { error, value } = validateData(getListCart, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, product } = value;
    const where = {};
    if (product) where.product = product;
    const documents = await getListCartMd(where, page, limit, [
      { path: 'product', select: '_id name code price sale avatar quantity' },
      { path: 'by', select: 'name' }
    ]);
    const total = await countListCartMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { error, value } = validateData(addToCartValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { product } = value;
    const checkProduct = await getDetailCartMd({ product, by: req.userInfo._id });
    if (checkProduct) return res.status(400).json({ status: false, mess: 'Sản phẩm đã có trong giỏ hàng' });
    else res.json({ status: true, data: await addCartMd({ product, by: req.userInfo._id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { error, value } = validateData(deleteProductCartValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteCartMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Sản phẩm trong giỏ hàng không tồn tại!' });
    else res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
