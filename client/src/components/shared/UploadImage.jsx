import { TrashIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@lib/helper';
import { Buttonz, Hrz, Imagez } from '@components/core';

const UploadImage = ({ data, setData, label }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(data);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      setData(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  useEffect(() => {
    if (!data) setFileUrl(null);
    else if (typeof data === 'string') setFileUrl(data);
  }, [data]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="card flex flex-col cursor-pointer m-2">
      <div className="mb-4">
        {label && <label className="inline-block font-medium text-left">{label}</label>}
        <Hrz />
      </div>
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-col justify-center items-center gap-4 h-72">
          <Imagez src={fileUrl} w={40} h={40} alt={label} />
          <span className="w-full line-clamp-2 text-center">{fileUrl}</span>
          <div className="flex gap-2 items-center justify-center">
            <div {...getRootProps()}>
              <Buttonz label="Đổi" />
            </div>
            <Buttonz color="red" variant="outlined" className="p-2" onClick={() => setData(null)}>
              <TrashIcon className="w-6" />
            </Buttonz>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="flex justify-center flex-col gap-4 text-center items-center p-2 h-72">
          <CloudArrowUpIcon className="w-32" />
          <span className="font-medium">Drag and Drop file</span>
          <span className="text-center font-semibold dark:text-neutral-200">OR</span>
          <Buttonz label="Browse" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
