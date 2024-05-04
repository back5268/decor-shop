import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';

const SendOtp = (props) => {
  const { id, email, username, isSend, setIsSend, api, setValue = () => {}, errors = {}, ...prop } = props;
  const { mutateAsync, isPending } = usePostApi(api);
  const { showToast } = useToastState();
  const onSendOtp = async () => {
    const response = await mutateAsync({ email, username });
    if (response) {
      showToast({ title: `Đã gửi mã OTP đến email ${email}`, severity: 'success' });
      setIsSend(true);
    }
  };

  return <div className="grid w-full items-center gap-2"></div>;
};

export default SendOtp;
