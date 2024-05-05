import React from 'react';
import {usePostApi} from '@lib/react-query';
import {useToastState} from '@store';
import {useNavigate} from "react-router-dom";
import { Buttonz, Dialogz, Spinnerz } from '@components/core';

const Wrapper = ({isModal, children, title, show, setShow, size}) => {
    if (isModal) return <Dialogz title={title} show={show} setShow={setShow} size={size}>{children}</Dialogz>
    else return <div className="bg-white rounded-lg shadow-xl">
        {title &&
            <h2 className="font-semibold uppercase leading-normal pt-6 px-6 text-neutral-800 dark:text-neutral-200">{title}</h2>}
        {children}
    </div>
}

const FormDetail = (props) => {
    const navigate = useNavigate()
    const {showToast} = useToastState();
    const {
        type = 'modal',
        title,
        children,
        show,
        setShow = () => {
        },
        isUpdate,
        insertApi,
        updateApi,
        handleData = () => {
        },
        handleSubmit = () => {
        },
        setParams = () => {
        },
        onSuccess = () => {},
        size
    } = props;
    const isModal = type === 'modal'
    const {mutateAsync, isPending} = usePostApi(isUpdate ? updateApi : insertApi);
    const newTitle = `${isUpdate ? 'Cập nhật' : 'Thêm mới'} ${title && String(title).toLocaleLowerCase()}`;

    const onSubmit = async (e) => {
        const data = handleData(e);
        const response = await mutateAsync(data);
        if (response) {
            onSuccess()
            showToast({title: `${newTitle} thành công!`, severity: 'success'});
            if (isModal) {
                setShow(false);
                setParams((pre) => ({...pre, render: !pre.render}));
            } else navigate(-1)
        }
    };

    return (
        <Wrapper title={newTitle} isModal={isModal} show={show} setShow={setShow} size={size}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                    <div className="card relative">
                        {isPending && (
                            <div
                                className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
                                <Spinnerz size={8} border={4} color="gray"/>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
                <div className="flex gap-2 justify-end px-6 py-4">
                    <Buttonz label={isModal ? 'Hủy' : 'Trở lại'} severity="secondary" onClick={() => {
                        if (isModal) setShow(false)
                        else navigate(-1)
                    }}/>
                    <Buttonz disabled={isPending} type="submit" label="Xác nhận"/>
                </div>
            </form>
        </Wrapper>
    );
};

export default FormDetail;
