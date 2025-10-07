import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { useRouter } from '../components/AppRouter';
import { Header } from '../components/Header';

export function CheckoutPage() {
  const { navigate, params } = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Form state
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0912345678',
    email: '',
    address: '',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Dịch Vọng',
    note: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Mock cart data - in real app, this would come from cart state
  const cartItems = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB - Chính hãng VN/A',
      quantity: params?.quantity || 1,
      price: 29990000
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 0; // Miễn phí giao hàng
  const total = subtotal + shippingFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.district || !formData.ward) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }

    // Place order logic
    console.log('Order placed:', {
      ...formData,
      paymentMethod,
      items: cartItems,
      total
    });

    alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
    navigate('orders');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('product')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thông tin giao hàng */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">📦</span>
                  Thông tin giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="0912345678"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Địa chỉ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Số nhà, tên đường"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.city} onValueChange={(value: string) => handleInputChange('city', value)}>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                        <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.district} onValueChange={(value: string) => handleInputChange('district', value)}>
                      <SelectTrigger id="district">
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cầu Giấy">Cầu Giấy</SelectItem>
                        <SelectItem value="Đống Đa">Đống Đa</SelectItem>
                        <SelectItem value="Ba Đình">Ba Đình</SelectItem>
                        <SelectItem value="Hoàn Kiếm">Hoàn Kiếm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward">
                      Phường/Xã <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.ward} onValueChange={(value: string) => handleInputChange('ward', value)}>
                      <SelectTrigger id="ward">
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dịch Vọng">Dịch Vọng</SelectItem>
                        <SelectItem value="Dịch Vọng Hậu">Dịch Vọng Hậu</SelectItem>
                        <SelectItem value="Mai Dịch">Mai Dịch</SelectItem>
                        <SelectItem value="Nghĩa Đô">Nghĩa Đô</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    value={formData.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Phương thức thanh toán */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">💳</span>
                  Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {/* COD */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="cod" id="cod" className="mt-1" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium mb-1">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-muted-foreground">
                          Thanh toán tiền mặt khi nhận hàng.
                        </div>
                      </Label>
                    </div>

                    {/* Chuyển khoản */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="bank" id="bank" className="mt-1" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="font-medium mb-1">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-muted-foreground">
                          Thanh toán qua tài khoản ngân hàng.
                        </div>
                      </Label>
                    </div>

                    {/* MoMo */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="momo" id="momo" className="mt-1" />
                      <Label htmlFor="momo" className="flex-1 cursor-pointer">
                        <div className="font-medium mb-1">Ví MoMo</div>
                        <div className="text-sm text-muted-foreground">
                          Thanh toán bằng ví điện tử MoMo.
                        </div>
                      </Label>
                    </div>

                    {/* Thẻ tín dụng */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="font-medium mb-1">Thẻ tín dụng/Ghi nợ</div>
                        <div className="text-sm text-muted-foreground">
                          Hỗ trợ Visa, Mastercard, JCB.
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="mr-2">🛍️</span>
                    Đơn hàng của bạn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Số lượng: {item.quantity}
                          </div>
                        </div>
                        <div className="font-medium ml-2">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Subtotal */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-6 border-2 border-orange-500"
                    onClick={handlePlaceOrder}
                  >
                    Mua hàng
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-muted-foreground text-center">
                    Bằng cách đặt hàng, bạn đồng ý với{' '}
                    <span className="text-primary cursor-pointer hover:underline">
                      Điều khoản dịch vụ
                    </span>
                    {' '}và{' '}
                    <span className="text-primary cursor-pointer hover:underline">
                      Chính sách bảo mật
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
