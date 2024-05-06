import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Buttonz, Linkz } from '@components/core';

export const UploadFiles = (props) => {
  const { files = [], setFiles, label, max, isView, type } = props;

  const removeFile = (item) => {
    setFiles(files.filter((f) => f !== item));
  };

  const onDrop = useCallback((acceptedFiles) => {
    let newFiles = [...acceptedFiles];
    if (max) newFiles = newFiles.splice(0, max);
    if (type)
      newFiles = newFiles.filter((file) => {
        return file.type.startsWith(type);
      });
    setFiles((pre) => [...pre, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`p-2 w-full`}>
      <div className="card flex flex-col cursor-pointer">
        <div className={'flex justify-between items-center mb-2'}>
          {label && <label className="font-semibold">{label}</label>}
          {!isView && (
            <div className={'flex gap-2'}>
              <Buttonz severity="danger" className={'!px-4'} onClick={() => setFiles([])}>
                <BiTrash size={16} />
              </Buttonz>
              <div {...getRootProps()}>
                <Buttonz label='Chọn files' />
              </div>
            </div>
          )}
        </div>
        <input {...getInputProps()} className="cursor-pointer" />
        {files?.length > 0 ? (
          <div className="flex justify-center flex-col gap-4 text-left mt-4">
            {files.map((f, index) => (
              <div key={index} className={'card flex items-center justify-between'}>
                <Linkz to={typeof f === 'string' ? f : ''} target={'_blank'}>
                  {f.name || f}
                </Linkz>
                {!isView && (
                  <Buttonz severity="danger" className={'!px-4'} onClick={() => removeFile(f)}>
                    <TrashIcon size={16} />
                  </Buttonz>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div {...getRootProps()} className="text-center p-2 font-semibold mt-4">
            <span>{isView ? 'Không có file' : 'Drag and Drop file'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFiles;
