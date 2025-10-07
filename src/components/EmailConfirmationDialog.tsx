import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

interface EmailConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'register' | 'forgot-password';
}

export function EmailConfirmationDialog({ open, onOpenChange, type }: EmailConfirmationDialogProps) {
  const message = type === 'register' 
    ? 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư và nhấn vào liên kết để kích hoạt tài khoản.'
    : 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư và nhấn vào liên kết để đặt lại mật khẩu.';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <DialogTitle className="text-center">Email đã được gửi</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Đã hiểu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
