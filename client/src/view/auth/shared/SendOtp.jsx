import { Buttonz } from '@components/core';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@components/ui/input-otp';
import { Label } from '@components/ui/label';
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

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id}>Mã xác nhận (*)</Label>
      <div className="flex align-item-center justify-between">
        <InputOTP id={id} maxLength={6} onChange={(e) => setValue(id, e)} {...prop}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className={errors[id] && 'border-red-500'} />
            <InputOTPSlot index={1} className={errors[id] && 'border-red-500'} />
            <InputOTPSlot index={2} className={errors[id] && 'border-red-500'} />
            <InputOTPSlot index={3} className={errors[id] && 'border-red-500'} />
            <InputOTPSlot index={4} className={errors[id] && 'border-red-500'} />
            <InputOTPSlot index={5} className={errors[id] && 'border-red-500'} />
          </InputOTPGroup>
        </InputOTP>
        <Buttonz onClick={onSendOtp} disabled={isSend} loading={isPending} label="Gửi OTP" />
      </div>
    </div>
  );
};

export default SendOtp;
