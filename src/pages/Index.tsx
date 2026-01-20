import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [selectedCalories, setSelectedCalories] = useState<'1200' | '1500' | '1800'>('1500');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(new Date());

  const weekDays = [
    { id: 'monday', label: 'Понедельник', emoji: '🌅' },
    { id: 'tuesday', label: 'Вторник', emoji: '🌞' },
    { id: 'wednesday', label: 'Среда', emoji: '⭐' },
    { id: 'thursday', label: 'Четверг', emoji: '🌟' },
    { id: 'friday', label: 'Пятница', emoji: '🎉' },
    { id: 'saturday', label: 'Суббота', emoji: '🎊' },
    { id: 'sunday', label: 'Воскресенье', emoji: '💫' },
  ];

  const calorieOptions = [
    { value: '1200', label: '1200 ккал', price: 1290, color: 'bg-green-500' },
    { value: '1500', label: '1500 ккал', price: 1490, color: 'bg-blue-500' },
    { value: '1800', label: '1800 ккал', price: 1690, color: 'bg-purple-500' },
  ];

  const menuData = {
    monday: {
      1200: {
        breakfast: 'Овсяная каша с ягодами и орехами',
        lunch: 'Куриная грудка с овощами на пару',
        dinner: 'Рыба на гриле с салатом',
        snack: 'Греческий йогурт с медом',
      },
      1500: {
        breakfast: 'Омлет с авокадо и цельнозерновым хлебом',
        lunch: 'Индейка с киноа и овощным миксом',
        dinner: 'Запеченный лосось с брокколи',
        snack: 'Протеиновый смузи с бананом',
      },
      1800: {
        breakfast: 'Белковые панкейки с ягодами и сиропом',
        lunch: 'Говядина с бататом и зеленой фасолью',
        dinner: 'Семга с картофелем и спаржей',
        snack: 'Энергетический батончик и фрукты',
      },
    },
    tuesday: {
      1200: {
        breakfast: 'Творожная запеканка с яблоками',
        lunch: 'Тушеная индейка с гречкой',
        dinner: 'Треска с овощами',
        snack: 'Яблоко и миндаль',
      },
      1500: {
        breakfast: 'Гранола с йогуртом и ягодами',
        lunch: 'Курица терияки с рисом басмати',
        dinner: 'Морепродукты с овощным салатом',
        snack: 'Протеиновый коктейль',
      },
      1800: {
        breakfast: 'Яичница с беконом и тостами',
        lunch: 'Стейк с овощами гриль и киноа',
        dinner: 'Дорадо с картофелем и салатом',
        snack: 'Орехи и сухофрукты',
      },
    },
  };

  const getCurrentMenu = () => {
    const dayMenu = menuData[selectedDay as keyof typeof menuData] || menuData.monday;
    return dayMenu[selectedCalories];
  };

  const addToCart = () => {
    const currentMenu = getCurrentMenu();
    const selectedOption = calorieOptions.find(opt => opt.value === selectedCalories);
    const dayLabel = weekDays.find(d => d.id === selectedDay)?.label;

    setCartItems([...cartItems, {
      day: dayLabel,
      calories: selectedCalories,
      price: selectedOption?.price,
      menu: currentMenu,
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                DE
              </div>
              <h1 className="text-2xl font-bold gradient-text">DailyEat</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#menu" className="text-gray-700 hover:text-primary transition-colors">Меню</a>
              <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Преимущества</a>
              <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="gradient-primary text-white relative">
              <Icon name="ShoppingCart" size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent">{cartItems.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <Badge className="gradient-accent text-white mb-6 px-6 py-2 text-base">
            Доставка готовых рационов
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Здоровое питание <br />
            <span className="gradient-text">на каждый день</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Выбирайте рационы по калорийности, получайте свежие блюда с доставкой. 
            Экономьте время — заботьтесь о здоровье!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 py-6 hover:scale-105 transition-transform">
              <Icon name="UtensilsCrossed" size={24} className="mr-2" />
              Выбрать меню
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10">
              <Icon name="PlayCircle" size={24} className="mr-2" />
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Flame', title: 'Контроль калорий', desc: '3 варианта калорийности под ваши цели', gradient: 'from-orange-400 to-red-500' },
            { icon: 'Clock', title: 'Экономия времени', desc: 'Готовые рационы на весь день', gradient: 'from-blue-400 to-cyan-500' },
            { icon: 'Truck', title: 'Доставка в срок', desc: 'Выбирайте удобное время доставки', gradient: 'from-purple-400 to-pink-500' },
          ].map((item, idx) => (
            <Card key={idx} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                  <Icon name={item.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Меню на <span className="gradient-text">неделю</span>
          </h2>
          <p className="text-xl text-gray-600">Выберите день и калорийность</p>
        </div>

        <Card className="border-none shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 p-4 overflow-x-auto">
                <TabsList className="inline-flex bg-white/80 backdrop-blur">
                  {weekDays.map((day) => (
                    <TabsTrigger 
                      key={day.id} 
                      value={day.id}
                      className="data-[state=active]:gradient-primary data-[state=active]:text-white px-4 py-2 whitespace-nowrap"
                    >
                      <span className="mr-2">{day.emoji}</span>
                      {day.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {weekDays.map((day) => (
                <TabsContent key={day.id} value={day.id} className="p-8">
                  {/* Calorie Selector */}
                  <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {calorieOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={selectedCalories === option.value ? 'default' : 'outline'}
                        onClick={() => setSelectedCalories(option.value as any)}
                        className={`${
                          selectedCalories === option.value 
                            ? 'gradient-primary text-white' 
                            : 'hover:bg-purple-50'
                        } px-6 py-6 text-lg transition-all hover:scale-105`}
                      >
                        <Icon name="Flame" size={20} className="mr-2" />
                        {option.label} — {option.price}₽
                      </Button>
                    ))}
                  </div>

                  {/* Menu Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {Object.entries(getCurrentMenu()).map(([meal, dish], idx) => (
                      <Card key={meal} className="border-2 border-purple-100 hover:border-purple-300 transition-all animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-white">
                              <Icon name={
                                meal === 'breakfast' ? 'Coffee' :
                                meal === 'lunch' ? 'UtensilsCrossed' :
                                meal === 'dinner' ? 'ChefHat' : 'Cookie'
                              } size={24} />
                            </div>
                            <div className="flex-1">
                              <Badge className="mb-2 capitalize">{
                                meal === 'breakfast' ? 'Завтрак' :
                                meal === 'lunch' ? 'Обед' :
                                meal === 'dinner' ? 'Ужин' : 'Перекус'
                              }</Badge>
                              <p className="text-lg font-medium">{dish}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      size="lg" 
                      onClick={addToCart}
                      className="gradient-primary text-white text-xl px-12 py-6 hover:scale-105 transition-transform shadow-xl"
                    >
                      <Icon name="Plus" size={24} className="mr-2" />
                      Добавить в корзину — {calorieOptions.find(o => o.value === selectedCalories)?.price}₽
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Cart Section */}
      {cartItems.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <Card className="border-none shadow-2xl gradient-primary text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Icon name="ShoppingBag" size={32} />
                Ваша корзина ({cartItems.length})
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-lg">{item.day}</h4>
                        <Badge className="bg-white text-primary">{item.calories} ккал</Badge>
                      </div>
                      <p className="text-white/90 font-semibold">{item.price}₽</p>
                    </div>
                  ))}
                  <div className="bg-white/30 backdrop-blur rounded-xl p-4 border-2 border-white/50">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Итого:</span>
                      <span>{cartItems.reduce((sum, item) => sum + item.price, 0)}₽</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-4">Оформление заказа</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 font-medium">Дата доставки</label>
                      <Calendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        className="bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">Время доставки</label>
                      <Select>
                        <SelectTrigger className="bg-white text-gray-900">
                          <SelectValue placeholder="Выберите интервал" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-12">09:00 - 12:00</SelectItem>
                          <SelectItem value="12-15">12:00 - 15:00</SelectItem>
                          <SelectItem value="15-18">15:00 - 18:00</SelectItem>
                          <SelectItem value="18-21">18:00 - 21:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-white text-primary hover:bg-white/90 text-lg py-6">
                      <Icon name="CreditCard" size={24} className="mr-2" />
                      Оплатить заказ
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Footer */}
      <footer id="contacts" className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4">DailyEat</h3>
              <p className="text-white/80">Здоровое питание каждый день</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Phone" size={18} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Mail" size={18} />
                  hello@dailyeat.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Instagram" size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Facebook" size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="MessageCircle" size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
