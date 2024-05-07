import React, { useEffect, useState } from 'react';
import { TrashIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useToastState, useConfirmState } from '@store';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeSpecialCharacter } from '@lib/helper';
import { Buttonz, Paginationz, Switchz } from '@components/core';
import { Loading } from '@components/shared';

const HeaderColumn = ({ children, className = '', ...prop }) => (
  <th className={`px-2 py-4 border-[1px] border-blue-gray-200 font-medium text-center ${className}`} {...prop}>
    {children}
  </th>
);
const BodyColumn = ({ children, className = '', ...prop }) => (
  <td className={`px-2 py-4 border-[1px] border-blue-gray-200 text-xs ${className}`} {...prop}>
    {children}
  </td>
);

const DataTable = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const [loading, setLoading] = useState(false);
  const {
    title,
    data = [],
    total = 0,
    isLoading = false,
    columns = [],
    params = { page: 1, limit: 10 },
    setParams = () => {},
    actionsInfo = {},
    headerInfo = {},
    statusInfo = {},
    baseActions = [],
    rows = [10, 20, 50, 100, 200, 500],
    onSuccess = () => {},
    hideParams
  } = props;
  const { onViewDetail = () => {}, deleteApi = () => {}, handleDelete = (item) => ({ _id: item._id }) } = actionsInfo;
  const { onInsert = () => {}, onImport = () => {}, exportApi } = headerInfo;
  const { changeStatusApi = () => {}, handleChangeStatus = (item) => ({ _id: item._id, status: item.status ? 0 : 1 }) } = statusInfo;

  const onDelete = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu này!',
      action: async () => {
        const response = await deleteApi(handleDelete(item));
        if (response) showToast({ title: 'Xóa dữ liệu thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const onExport = async () => {
    setLoading(true);
    const response = await exportApi({ ...params, page: undefined, limit: undefined });
    setLoading(false);
    if (response) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(response);
      downloadLink.download = (title && `ket-qua-export-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx';
      downloadLink.click();
      showToast({ title: `Export ${title} thành công!`, severity: 'success' });
    }
  };

  const onChangeStatus = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn chuyển trạng thái dữ liệu này!',
      action: async () => {
        const response = await changeStatusApi(handleChangeStatus(item));
        if (response) showToast({ title: 'Chuyển trạng thái thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const isActions = baseActions.includes('detail') || baseActions.includes('delete');
  const isHeader = baseActions.includes('insert') || baseActions.includes('import') || baseActions.includes('export');
  const isStatus = Boolean(statusInfo.changeStatusApi);

  useEffect(() => {
    if (hideParams) return;
    const query = {};
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (!['render'].includes(key) && !['', undefined, null].includes(value)) query[key] = value;
      }
    }
    navigate(location.pathname + '?' + new URLSearchParams(query).toString());
  }, [JSON.stringify(params)]);

  return (
    <div className="card mt-4 text-color">
      {isHeader && (
        <div className="flex gap-2 justify-start mb-1">
          {baseActions.includes('insert') && <Buttonz onClick={onInsert}>Thêm mới</Buttonz>}
          {baseActions.includes('import') && (
            <Buttonz severity="info" onClick={onImport}>
              Import
            </Buttonz>
          )}
          {baseActions.includes('export') && (
            <Buttonz severity="info" onClick={onExport} loading={loading}>
              Export
            </Buttonz>
          )}
        </div>
      )}
      <div className="flex flex-col overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-x-auto overflow-y-hidden relative">
            {isLoading && <Loading />}
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <HeaderColumn>#</HeaderColumn>
                  {columns.map((column, index) => (
                    <HeaderColumn key={index}>{column.label}</HeaderColumn>
                  ))}
                  {isStatus && <HeaderColumn>Trạng thái</HeaderColumn>}
                  {isActions && <HeaderColumn>Thao tác</HeaderColumn>}
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => {
                    const bgColor = index % 2 === 1 ? 'bg-gray-50' : '';
                    return (
                      <tr key={index}>
                        <BodyColumn>{(params.page - 1) * params.limit + index + 1}</BodyColumn>
                        {columns.map((column, i) => {
                          const children = column.body && typeof column.body === 'function' ? column.body(item) : item[column.field];
                          return <BodyColumn key={i}>{children}</BodyColumn>;
                        })}
                        {isStatus && (
                          <BodyColumn>
                            <div className="flex justify-center items-center">
                              <Switchz checked={Boolean(item.status)} onChange={() => onChangeStatus(item)} />
                            </div>
                          </BodyColumn>
                        )}
                        {isActions && (
                          <BodyColumn>
                            <div className="flex justify-center items-center gap-2">
                              {baseActions.includes('detail') && (
                                <Buttonz onClick={() => onViewDetail(item)} variant="outlined" className="rounded-full p-2">
                                  <DocumentMagnifyingGlassIcon className="w-5" />
                                </Buttonz>
                              )}
                              {baseActions.includes('delete') && (
                                <Buttonz color="red" onClick={() => onDelete(item)} variant="outlined" className="rounded-full p-2">
                                  <TrashIcon className="w-5" />
                                </Buttonz>
                              )}
                            </div>
                          </BodyColumn>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <BodyColumn className="text-center" colSpan={columns.length + 1 + Number(isActions) + Number(isStatus)}>
                      Không có dữ liệu
                    </BodyColumn>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Paginationz params={params} setParams={setParams} total={total} rows={rows} />
      </div>
    </div>
  );
};

export default DataTable;
