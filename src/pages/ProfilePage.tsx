import React, { useState } from 'react';
import { Settings, Edit3, Heart, Bookmark, Users, Package, Star, MessageCircle, Share2, MoreHorizontal, Camera, Bell, Moon, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { useRouter } from '../components/AppRouter';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Nguyễn Văn Demo',
  email: 'demo@example.com',
  phone: '+84 123 456 789',
  avatar: '',
  bio: 'Yêu thích công nghệ và thời trang. Bán hàng online từ 2020. Cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.',
  joinDate: 'Tham gia từ tháng 3, 2020',
  location: 'Hà Nội, Việt Nam',
  verified: false,
  stats: {
    posts: 42,
    followers: 1250,
    following: 389,
    rating: 4.8,
    totalRatings: 156
  }
};

// Mock posts data
const mockUserPosts = [
  {
    id: '1',
    seller: {
      id: '1',
      name: mockUser.name,
      avatar: mockUser.avatar,
      verified: mockUser.verified
    },
    title: 'MacBook Pro M3 14" - Mới 100%',
    description: 'MacBook Pro M3 14 inch mới nguyên seal, bảo hành Apple Care+',
    images: ['https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    tags: ['macbook', 'apple', 'laptop'],
    price: 52000000,
    stock: 3,
    upvotes: 24,
    downvotes: 1,
    comments: 12,
    timestamp: '2 ngày trước',
    views: 1250
  }
];

const mockSavedPosts = [
  {
    id: '2',
    seller: {
      id: 'other1',
      name: 'TechStore VN',
      avatar: '',
      verified: true
    },
    title: 'iPhone 15 Pro Max 256GB',
    description: 'iPhone 15 Pro Max chính hãng, bảo hành 12 tháng',
    images: ['https://images.unsplash.com/photo-1598860237986-013eede8beae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMGdhZGdldHxlbnwxfHx8fDE3NTg0MDk3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    tags: ['iphone', 'apple'],
    price: 29990000,
    stock: 5,
    upvotes: 45,
    downvotes: 3,
    comments: 23,
    timestamp: '1 ngày trước',
    isSaved: true
  }
];

export function ProfilePage() {
  const { navigate, setAuthenticated } = useRouter();
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    location: mockUser.location
  });

  // Settings state
  const [notifications, setNotifications] = useState({
    mentions: true,
    hashtags: true,
    followers: true,
    system: false
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(false);
    // Save profile logic here
    console.log('Saving profile:', editForm);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback className="text-2xl">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* User Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                      {mockUser.verified && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{mockUser.email}</p>
                    <p className="text-sm text-muted-foreground">{mockUser.location}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-center mb-4">{mockUser.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{mockUser.stats.posts}</div>
                      <div className="text-xs text-muted-foreground">Bài viết</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{mockUser.stats.followers}</div>
                      <div className="text-xs text-muted-foreground">Người theo dõi</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{mockUser.stats.following}</div>
                      <div className="text-xs text-muted-foreground">Đang theo dõi</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="ml-1 font-medium">{mockUser.stats.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({mockUser.stats.totalRatings} đánh giá)
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-6">{mockUser.joinDate}</p>

                  {/* Action Buttons */}
                  <div className="space-y-2 w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Chỉnh sửa hồ sơ
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Tên hiển thị</Label>
                            <Input
                              id="name"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">Giới thiệu</Label>
                            <Textarea
                              id="bio"
                              value={editForm.bio}
                              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Địa điểm</Label>
                            <Input
                              id="location"
                              value={editForm.location}
                              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleEditProfile} className="w-full">
                            Lưu thay đổi
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Chia sẻ hồ sơ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Bài viết
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Đã lưu
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Giới thiệu
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bài viết của tôi ({mockUserPosts.length})</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Lưới
                    </Button>
                    <Button variant="outline" size="sm">
                      Danh sách
                    </Button>
                  </div>
                </div>

                {mockUserPosts.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Chưa có bài viết nào</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Bắt đầu đăng bán sản phẩm đầu tiên của bạn
                      </p>
                      <Button className="bg-primary hover:bg-primary-dark">
                        Đăng bài viết mới
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {mockUserPosts.map((post) => (
                      <div key={post.id} className="relative">
                        <PostCard post={post} />
                        <div className="absolute top-4 right-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Xem thống kê
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Xóa bài viết
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bài viết đã lưu ({mockSavedPosts.length})</h3>
                </div>

                {mockSavedPosts.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Chưa có bài viết nào được lưu</h3>
                      <p className="text-sm text-muted-foreground">
                        Các bài viết bạn lưu sẽ xuất hiện ở đây
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {mockSavedPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cửa hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Giới thiệu</h4>
                      <p className="text-sm text-muted-foreground">{mockUser.bio}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Thống kê</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tổng bài viết:</span>
                            <span>{mockUser.stats.posts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Người theo dõi:</span>
                            <span>{mockUser.stats.followers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Đánh giá:</span>
                            <span>{mockUser.stats.rating}/5 ⭐</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Chính sách</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• Bảo hành 12 tháng</p>
                          <p>• Đổi trả trong 7 ngày</p>
                          <p>• Giao hàng toàn quốc</p>
                          <p>• Hỗ trợ trả góp 0%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt thông báo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mentions">Thông báo khi được nhắc đến</Label>
                        <p className="text-sm text-muted-foreground">Nhận thông báo khi ai đó nhắc đến bạn</p>
                      </div>
                      <Switch
                        id="mentions"
                        checked={notifications.mentions}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, mentions: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="hashtags">Thông báo hashtag</Label>
                        <p className="text-sm text-muted-foreground">Nhận thông báo từ hashtag theo dõi</p>
                      </div>
                      <Switch
                        id="hashtags"
                        checked={notifications.hashtags}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, hashtags: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="followers">Thông báo người theo dõi</Label>
                        <p className="text-sm text-muted-foreground">Nhận thông báo khi có người theo dõi mới</p>
                      </div>
                      <Switch
                        id="followers"
                        checked={notifications.followers}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, followers: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system">Thông báo hệ thống</Label>
                        <p className="text-sm text-muted-foreground">Nhận thông báo cập nhật và khuyến mãi</p>
                      </div>
                      <Switch
                        id="system"
                        checked={notifications.system}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, system: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Giao diện</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Chế độ tối</Label>
                        <p className="text-sm text-muted-foreground">Chuyển sang giao diện tối</p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tài khoản</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Đổi mật khẩu
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Xóa tài khoản
                    </Button>
                    <Separator />
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}