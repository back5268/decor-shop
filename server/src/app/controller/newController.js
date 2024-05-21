import { addNewsValid, listNewsValid, updateNewsValid, detailNewsValid } from '@lib/validation';
import { addNewsMd, countListNewsMd, deleteNewsMd, getDetailNewsMd, getListNewsMd, updateNewsMd } from '@models';
import { validateData } from '@utils';

export const getListNews = async (req, res) => {
  try {
    const { error, value } = validateData(listNewsValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.title = { $regex: keySearch, $options: 'i' };
    if (status || status === 0) where.status = status;
    const documents = await getListNewsMd(where, page, limit, [{ path: 'by', select: 'fullName' }]);
    const total = await countListNewsMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListNewsWeb = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const where = { type: 'news' };
    const documents = await getListNewsMd(where, page, limit, [{ path: 'by', select: 'avatar fullName' }], false);
    const total = await countListNewsMd(where);
    const isLastPage = page >= total / limit;
    res.json({ status: true, data: { documents, nextPage: !isLastPage ? page + 1 : undefined } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailNews = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewsValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailNewsMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const data = await deleteNewsMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });

    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addNews = async (req, res) => {
  try {
    const { error, value } = validateData(addNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { title, content, time, hashtag } = value;

    const data = await addNewsMd({
      by: req.userInfo._id,
      title,
      content,
      time,
      hashtag,
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { error, value } = validateData(updateNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, title, content, status, time, hashtag } = value;

    const news = await getDetailNewsMd({ _id });
    if (!news) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });

    const data = await updateNewsMd({ _id }, { title, status, content, time, hashtag });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
