import { getListNewsWebApi } from '@api';
import { Buttonz, Dialogz, Hrz } from '@components/core';
import { multiFormatDateString } from '@lib/helper';
import { useInfinityApi } from '@lib/react-query';
import React, { Fragment, useEffect, useState } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

const NewsSection = () => {
  const [open, setOpen] = useState(true);
  const [news, setNews] = useState([]);
  const { data } = useInfinityApi((params) => getListNewsWebApi(params), 'news', 10);

  useEffect(() => {
    if (data?.pages) {
      let newData = [];
      data.pages.forEach((d) => {
        const documents = d?.documents;
        if (Array.isArray(documents)) newData = [...newData, ...documents];
      });
      setNews(newData);
    }
  }, [data]);

  return (
    <Fragment>
      <div className="fixed bottom-4 left-4">
        <Buttonz color="red" onClick={() => setOpen(true)} style={{ backgroundColor: '#a45909' }}>
          <div className="flex gap-2 justify-center items-center">
            <SpeakerWaveIcon className="w-4 h-4 stroke-2" /> Tin tức ({news?.length})
          </div>
        </Buttonz>
      </div>
      <Dialogz title="Decor Star New Feed" open={open} setOpen={setOpen} className="w-[1000px]">
        {news?.length > 0 ? (
          <div className="flex flex-col gap-8 h-[520px] overflow-scroll">
            {news.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-4 p-8">
                  <div>
                    <p className="font-medium text-lg flex gap-2">
                      <span className="text-red-500">#</span> {item.title}
                    </p>
                    <Hrz />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                  <div className="flex gap-2 items-center">
                    <span>{multiFormatDateString(item?.createdAt)}</span>
                  </div>
                  <Hrz />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 font-medium text-lg">Chưa có thông báo nào được tạo!</div>
        )}
      </Dialogz>
    </Fragment>
  );
};

export default NewsSection;
