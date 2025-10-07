import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useRouter } from '../components/AppRouter';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const { navigate, setAuthenticated, setUser, setGuest } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Username/Password state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameLogin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        name: 'Người dùng Demo',
        email: username.includes('@') ? username : 'demo@example.com',
        username: username,
        avatar: ''
      };
      setUser(mockUser);
      setAuthenticated(true);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error('Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    setGuest(true);
    toast.success('Chào mừng bạn! Bạn đang sử dụng với tư cách khách');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <p className="text-muted-foreground">Chào mừng bạn quay trở lại</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email hoặc tên đăng nhập</Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập email hoặc username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <Button 
                variant="link" 
                className="px-0 text-sm"
                onClick={() => navigate('forgot-password')}
              >
                Quên mật khẩu?
              </Button>
            </div>
            
            <Button 
              onClick={handleUsernameLogin}
              disabled={loading || !username || !password}
              className="w-full bg-primary hover:bg-primary-dark"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <Button 
              variant="ghost" 
              onClick={handleGuestMode}
              className="w-full border border-dashed hover:bg-muted/50"
            >
              Tiếp tục với tư cách khách
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Chưa có tài khoản?{' '}
                <Button 
                  variant="link" 
                  className="px-0 font-medium"
                  onClick={() => navigate('register')}
                >
                  Đăng ký ngay
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
