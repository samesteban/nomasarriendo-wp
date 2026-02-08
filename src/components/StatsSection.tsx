import { Card } from './ui/card';
import { Award, Calendar, TrendingUp, Users } from 'lucide-react';

type StatItem = {
  number?: string;
  label?: string;
  description?: string;
  icon?: string | { url?: string };
};

type StatsSectionProps = {
  items?: StatItem[];
};

const iconMap: Record<string, typeof Users> = {
  users: Users,
  calendar: Calendar,
  award: Award,
  trendingup: TrendingUp,
};

export function StatsSection({ items }: StatsSectionProps) {
  const stats = items?.length
    ? items
    : [
    {
      icon: "Users",
      number: "+150",
      label: "Familias asesoradas",
      description: "Han confiado en nuestro proceso"
    },
    {
      icon: "Calendar",
      number: "10",
      label: "Años de experiencia",
      description: "En el mercado inmobiliario chileno"
    },
    {
      icon: "Award",
      number: "95%",
      label: "Satisfacción",
      description: "De nuestros clientes"
    },
    {
      icon: "TrendingUp",
      number: "85%",
      label: "Éxito en compras",
      description: "Completadas exitosamente"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const iconValue = stat.icon;
            const iconUrl =
              iconValue && typeof iconValue === "object" && "url" in iconValue
                ? iconValue.url || ""
                : "";
            const iconKey =
              typeof iconValue === "string"
                ? iconValue.toLowerCase()
                : "users";
            const IconComponent = iconMap[iconKey] || Users;
            return (
              <Card key={index} className="p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-beige">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center">
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={stat.label || "Icono"}
                        className="w-6 h-6"
                      />
                    ) : (
                      <IconComponent className="w-6 h-6 text-brand-brown" />
                    )}
                  </div>
                </div>
                
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
