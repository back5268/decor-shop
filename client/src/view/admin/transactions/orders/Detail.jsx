import React, { useState } from 'react';
import { Buttonz, Dialogz, Hrz, Inputz } from '@components/core';
import { useToastState } from '@store';
import { confirmOrderApi } from '@api';

const DetailOrder = (props) => {
  const { open, setOpen, setParams } = props;
  const [value, setValue] = useState('');
  const { showToast } = useToastState();

  const handleData = async () => {
    const response = await confirmOrderApi({ value, _id: open });
    if (response) {
      showToast({ title: 'Xác nhận thanh toán thành công', severity: 'success' });
      setParams((prem) => ({ ...prem, render: !prem.render }));
      setOpen(false);
      setValue('');
    }
  };

  return (
    <Dialogz
      className="w-[32rem]"
      title="Xác nhận thanh toán"
      open={Boolean(open)}
      setOpen={() => {
        setOpen(false);
        setValue('');
      }}
    >
      <form className="w-full mt-4">
        <Inputz className="!w-full" label="Mã giao dịch" value={value} onChange={(e) => setValue(e.target.value)} />
        <Hrz className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz variant="outlined" color="red" label="Hủy" onClick={() => setOpen(false)} />
          <Buttonz type="button" onClick={() => handleData()} label="Xác nhận" />
        </div>
      </form>
    </Dialogz>
  );
};

export default DetailOrder;
