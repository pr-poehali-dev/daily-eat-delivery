import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'ул. Пушкина, д. 10, кв. 5',
  });

  const orders = [
    {
      id: '1',
      date: '2026-01-18',
      status: 'delivered',
      items: 5,
      total: 7450,
      deliveryDate: '2026-01-20',
    },
    {
      id: '2',
      date: '2026-01-15',
      status: 'processing',
      items: 3,
      total: 4470,
      deliveryDate: '2026-01-22',
    },
    {
      id: '3',
      date: '2026-01-10',
      status: 'delivered',
      items: 7,
      total: 10430,
      deliveryDate: '2026-01-15',
    },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Профиль обновлен');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: { label: 'Доставлен', color: 'bg-green-500' },
      processing: { label: 'В обработке', color: 'bg-blue-500' },
      cancelled: { label: 'Отменен', color: 'bg-red-500' },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, color: 'bg-gray-500' };
    return <Badge className={`${statusInfo.color} text-white`}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h1 className="text-2xl font-bold gradient-text">Личный кабинет</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="orders" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="Package" size={18} className="mr-2" />
              Мои заказы
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">Заказ #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">от {new Date(order.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="ShoppingBag" size={16} />
                      <span>{order.items} рационов</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="Calendar" size={16} />
                      <span>Доставка: {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold gradient-text">
                      <Icon name="Wallet" size={16} />
                      <span>{order.total} ₽</span>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        Повторить заказ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Персональные данные</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Имя</Label>
                    <Input
                      id="profile-name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-email">Email</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-phone">Телефон</Label>
                    <Input
                      id="profile-phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-address">Адрес доставки</Label>
                    <Input
                      id="profile-address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="gradient-primary text-white">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Подписка</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div>
                    <h3 className="font-bold mb-1">Активная подписка</h3>
                    <p className="text-sm text-gray-600">До 28 января 2026</p>
                  </div>
                  <Badge className="gradient-accent text-white">Premium</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Управление подпиской
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
