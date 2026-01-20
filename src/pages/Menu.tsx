import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Menu = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCalories, setSelectedCalories] = useState<'1200' | '1500' | '1800'>('1500');
  const [selectedDay, setSelectedDay] = useState('monday');

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
    { value: '1200', label: '1200 ккал', price: 1290, color: 'from-green-400 to-emerald-500' },
    { value: '1500', label: '1500 ккал', price: 1490, color: 'from-blue-400 to-cyan-500' },
    { value: '1800', label: '1800 ккал', price: 1690, color: 'from-purple-400 to-pink-500' },
  ];

  const menuData: any = {
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
    wednesday: {
      1200: {
        breakfast: 'Йогурт с мюсли',
        lunch: 'Куриное филе с рисом',
        dinner: 'Тунец с овощами',
        snack: 'Фрукты',
      },
      1500: {
        breakfast: 'Сырники с ягодами',
        lunch: 'Телятина с гречкой',
        dinner: 'Дорадо с овощами',
        snack: 'Творожок',
      },
      1800: {
        breakfast: 'Омлет с сыром и овощами',
        lunch: 'Говядина с картофелем',
        dinner: 'Семга с киноа',
        snack: 'Протеиновый батончик',
      },
    },
  };

  const getCurrentMenu = () => {
    const dayMenu = menuData[selectedDay] || menuData.monday;
    return dayMenu[selectedCalories];
  };

  const handleAddToCart = () => {
    const currentMenu = getCurrentMenu();
    const selectedOption = calorieOptions.find(opt => opt.value === selectedCalories);
    const dayLabel = weekDays.find(d => d.id === selectedDay)?.label || '';

    addItem({
      id: '',
      day: dayLabel,
      calories: selectedCalories,
      price: selectedOption?.price || 0,
      menu: currentMenu,
    });

    toast.success('Рацион добавлен в корзину');
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
            <h1 className="text-2xl font-bold gradient-text">Меню на неделю</h1>
            <Button onClick={() => navigate('/cart')} className="gradient-primary text-white">
              <Icon name="ShoppingCart" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Выберите калорийность</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {calorieOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedCalories === option.value ? 'ring-4 ring-purple-400 shadow-xl' : ''
                }`}
                onClick={() => setSelectedCalories(option.value as any)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center text-white text-2xl font-bold`}>
                    <Icon name="Flame" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.label}</h3>
                  <p className="text-2xl font-bold gradient-text">{option.price} ₽</p>
                  <p className="text-sm text-gray-600 mt-2">в день</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-0">
            <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 p-4">
                <TabsList className="inline-flex bg-white/80 backdrop-blur w-full overflow-x-auto">
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
                <TabsContent key={day.id} value={day.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'breakfast', icon: 'Sunrise', title: 'Завтрак', color: 'from-orange-400 to-yellow-500' },
                      { key: 'lunch', icon: 'Sun', title: 'Обед', color: 'from-blue-400 to-cyan-500' },
                      { key: 'dinner', icon: 'Moon', title: 'Ужин', color: 'from-purple-400 to-pink-500' },
                      { key: 'snack', icon: 'Coffee', title: 'Перекус', color: 'from-green-400 to-emerald-500' },
                    ].map((meal) => (
                      <Card key={meal.key} className="border-2 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${meal.color} flex items-center justify-center`}>
                              <Icon name={meal.icon as any} size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{meal.title}</h3>
                          </div>
                          <p className="text-gray-700">{getCurrentMenu()[meal.key]}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className="gradient-primary text-white px-12 py-6 text-lg"
                    >
                      <Icon name="ShoppingCart" size={24} className="mr-2" />
                      Добавить в корзину — {calorieOptions.find(opt => opt.value === selectedCalories)?.price} ₽
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Menu;
