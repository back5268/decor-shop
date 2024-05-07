import React from 'react';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';
import { Buttonz, Dialogz, Hrz } from '@components/core';
import { Loading } from '@components/shared';

const Wrapper = ({ isModal, children, title, open, setOpen }) => {
  if (isModal)
    return (
      <Dialogz className="w-[1200px]" title={title} open={open} setOpen={setOpen}>
        {children}
      </Dialogz>
    );
  else
    return (
      <div className="bg-white rounded-lg shadow-xl">
        {title && <h2 className="font-semibold uppercase leading-normal pt-6 px-6 text-neutral-800 dark:text-neutral-200">{title}</h2>}
        {children}
      </div>
    );
};

const FormDetail = (props) => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const {
    type = 'modal',
    title,
    children,
    open,
    setOpen = () => {},
    isUpdate,
    insertApi,
    updateApi,
    handleData = () => {},
    handleSubmit = () => {},
    setParams = () => {},
    onSuccess = () => {}
  } = props;
  const isModal = type === 'modal';
  const { mutateAsync, isPending } = usePostApi(isUpdate ? updateApi : insertApi);
  const newTitle = `${isUpdate ? 'Cập nhật' : 'Thêm mới'} ${title && String(title).toLocaleLowerCase()}`;

  const onSubmit = async (e) => {
    const data = handleData(e);
    const response = await mutateAsync(data);
    if (response) {
      onSuccess();
      openToast({ title: `${newTitle} thành công!`, severity: 'success' });
      if (isModal) {
        setOpen(false);
        setParams((pre) => ({ ...pre, render: !pre.render }));
      } else navigate(-1);
    }
  };

  return (
    <Wrapper title={newTitle} isModal={isModal} open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card relative w-full mt-4">
          {isPending && <Loading />}
          {children}
        </div>
        <Hrz className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz
            variant="outlined"
            color="red"
            label={isModal ? 'Hủy' : 'Trở lại'}
            onClick={() => {
              if (isModal) setOpen(false);
              else navigate(-1);
            }}
          />
          <Buttonz loading={isPending} type="submit" label="Xác nhận" />
        </div>
      </form>
    </Wrapper>
  );
};

export default FormDetail;
