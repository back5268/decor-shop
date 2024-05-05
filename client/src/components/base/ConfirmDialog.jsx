import React from 'react';
import { useConfirmState } from '@store';
import { Buttonz, Dialogz } from '@components/core';

const ConfirmDialog = () => {
  const { confirmInfo = {}, open, hideConfirm } = useConfirmState();

  return (
    <Dialogz open={open} setOpen={hideConfirm}>
      <div className="p-6">{confirmInfo.title || 'Bạn có chắc chắn muốn tiếp tục?'}</div>
      <div className="flex gap-2 justify-end py-4 mr-4">
        <Buttonz label="Hủy" color="red" onClick={() => hideConfirm()} />
        <Buttonz
          label="Xác nhận"
          onClick={async () => {
            await confirmInfo?.action();
            hideConfirm();
          }}
        />
      </div>
    </Dialogz>
  );
};

export default ConfirmDialog;
