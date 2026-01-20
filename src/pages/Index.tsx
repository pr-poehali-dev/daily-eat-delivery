import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
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
              <Button variant="ghost" onClick={() => navigate('/menu')}>Меню</Button>
              <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Преимущества</a>
              <Button variant="ghost" onClick={() => navigate('/profile')}>Профиль</Button>
            </nav>
            <Button onClick={() => navigate('/cart')} className="gradient-primary text-white relative">
              <Icon name="ShoppingCart" size={20} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent">{getTotalItems()}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

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
            <Button onClick={() => navigate('/menu')} size="lg" className="gradient-primary text-white text-lg px-8 py-6 hover:scale-105 transition-transform">
              <Icon name="UtensilsCrossed" size={24} className="mr-2" />
              Выбрать меню
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10" onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Info" size={24} className="mr-2" />
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

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

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { num: '1', title: 'Выберите рацион', desc: 'Подберите калорийность под свои цели', icon: 'Target' },
            { num: '2', title: 'Оформите заказ', desc: 'Укажите удобное время доставки', icon: 'Calendar' },
            { num: '3', title: 'Получите блюда', desc: 'Свежие рационы привезут к вам домой', icon: 'Truck' },
            { num: '4', title: 'Наслаждайтесь', desc: 'Питайтесь вкусно и правильно', icon: 'Heart' },
          ].map((step, idx) => (
            <Card key={idx} className="text-center relative pt-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {step.num}
              </div>
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Icon name={step.icon as any} size={28} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button onClick={() => navigate('/menu')} size="lg" className="gradient-primary text-white px-10 py-6 text-lg">
            <Icon name="Rocket" size={24} className="mr-2" />
            Начать сейчас
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Присоединяйтесь к тысячам людей, которые уже изменили свою жизнь с DailyEat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/menu')} size="lg" className="gradient-primary text-white px-8 py-6 text-lg">
              <Icon name="ShoppingBag" size={24} className="mr-2" />
              Выбрать рацион
            </Button>
            <Button onClick={() => navigate('/profile')} size="lg" variant="outline" className="bg-white px-8 py-6 text-lg">
              <Icon name="User" size={24} className="mr-2" />
              Мой профиль
            </Button>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 mt-16 border-t border-purple-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white text-lg font-bold">
                DE
              </div>
              <span className="text-xl font-bold gradient-text">DailyEat</span>
            </div>
            <p className="text-gray-600 text-sm">Здоровое питание каждый день</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Меню</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Рационы</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Калорийность</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Цены</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Компания</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📞 +7 (999) 123-45-67</li>
              <li>📧 hello@dailyeat.ru</li>
              <li>📍 Москва, ул. Пушкина</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-100 text-center text-sm text-gray-600">
          © 2026 DailyEat. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;
