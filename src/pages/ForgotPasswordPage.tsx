import { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useRouter } from '../components/AppRouter';
import { EmailConfirmationDialog } from '../components/EmailConfirmationDialog';
import { toast } from 'sonner@2.0.3';

export function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Vui lòng nhập email hợp lệ');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowDialog(true);
      toast.success('Email đặt lại mật khẩu đã được gửi');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('login')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <div className="w-8"></div>
          </div>
          <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
          <p className="text-muted-foreground">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-primary hover:bg-primary-dark"
            >
              {loading ? 'Đang gửi...' : 'Xác nhận'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Nhớ mật khẩu?{' '}
                <Button 
                  variant="link" 
                  className="px-0 font-medium"
                  onClick={() => navigate('login')}
                >
                  Đăng nhập ngay
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EmailConfirmationDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
        type="forgot-password"
      />
    </div>
  );
}
