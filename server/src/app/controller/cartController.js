import { addToCartValid } from '@lib/validation';
import { addCartMd, deleteCartMd, getListCartMd } from '@models';

export const getListCartByUser = async (req, res) => {
  try {
    res.json({ status: true, data: await getListCartMd({ by: req.userInfo?._id }, false, false, [{ path: 'product', select: '_id name code price sale avatar quantity' }]) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { error, value } = validateData(addToCartValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { product } = value;
    res.json({ status: true, data: await addCartMd({ product, by: req.userInfo._id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { error, value } = validateData(deleteProductCart, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteCartMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Sản phẩm trong giỏ hàng không tồn tại!' });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
