import { Buttonz, CheckBoxz, Hrz, Paginationz } from '@components/core';
import React from 'react';

const HeaderColumn = ({ children, className = '', ...prop }) => (
  <th className={`p-2 bg-blue-gray-50 font-medium text-center ${className}`} {...prop}>
    {children}
  </th>
);
const BodyColumn = ({ children, className = '', ...prop }) => (
  <td className={`p-2 text-xs text-center ${className}`} {...prop}>
    {children}
  </td>
);

const DataTablePayment = (props) => {
  const {
    select,
    setSelect,
    data = [],
    total = 0,
    columns = [],
    params = { page: 1, limit: 10 },
    setParams = () => {},
    moreActions = [],
    rows = [10, 20, 50, 100],
    isPag
  } = props;

  const isActions = moreActions[0];
  return (
    <div className="flex flex-col overflow-x-auto w-full">
      <div className="inline-block min-w-full py-2">
        <div className="overflow-x-auto overflow-y-hidden relative">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                {select && (
                  <HeaderColumn className="min-w-8">
                    <CheckBoxz
                      checked={select.length > 0 && select.length === data.length}
                      onChange={() => setSelect(() => (select.length === data.length ? [] : data.map((d) => d._id)))}
                    />
                  </HeaderColumn>
                )}
                {isPag && <HeaderColumn className="min-w-8">#</HeaderColumn>}
                {columns.map((column, index) => (
                  <HeaderColumn key={index}>{column.label}</HeaderColumn>
                ))}
                {isActions && <HeaderColumn>Thao tác</HeaderColumn>}
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      {select && (
                        <BodyColumn className="text-center">
                          <CheckBoxz
                            checked={select.includes(item._id)}
                            onChange={() =>
                              setSelect((pre) => (select.includes(item._id) ? pre.filter((p) => p !== item._id) : [...pre, item._id]))
                            }
                          />
                        </BodyColumn>
                      )}
                      {isPag && <BodyColumn className="text-center">{(params.page - 1) * params.limit + index + 1}</BodyColumn>}
                      {columns.map((column, i) => {
                        const children = column.body && typeof column.body === 'function' ? column.body(item) : item[column.field];
                        return (
                          <BodyColumn key={i} className={column.className}>
                            {children}
                          </BodyColumn>
                        );
                      })}
                      {isActions && (
                        <BodyColumn>
                          <div className="flex justify-center items-center gap-2">
                            {moreActions?.length > 0 &&
                              moreActions.map((action, index) => {
                                const color = action.color || 'cyan';
                                const variant = action.variant || 'outlined';
                                const Icon = action.icon;

                                return (
                                  <Buttonz
                                    key={index}
                                    color={color}
                                    onClick={() => action.onClick(item)}
                                    variant={variant}
                                    className="rounded-full p-2"
                                  >
                                    <Icon className="w-5" />
                                  </Buttonz>
                                );
                              })}
                          </div>
                        </BodyColumn>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <BodyColumn className="text-center py-4 !text-sm" colSpan={columns.length + 2 + (Number(isActions) || 0)}>
                    Không có dữ liệu
                  </BodyColumn>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Hrz />
      {isPag && (
        <div className="flex justify-center mt-4">
          <Paginationz params={params} setParams={setParams} total={total} rows={rows} />
        </div>
      )}
    </div>
  );
};

export default DataTablePayment;
