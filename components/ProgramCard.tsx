import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./button";

const ProgramCard = ({
    level,
    title,
    grade,
    points,
    color,
    buttonColor,
    onClick
}) => {

    const colorMap = {
        blue: {
            tagBg: "bg-blue-100",
            tagText: "text-blue-600",
            border: "border-blue-200",
            icon: "#2563EB",
        },
        green: {
            tagBg: "bg-green-100",
            tagText: "text-green-600",
            border: "border-green-300",
            icon: "#22C55E",
        },
    };

    const c = colorMap[color] || colorMap.blue;

    return (
        <Card
            className={`bg-white border ${c.border} rounded-2xl shadow-sm 
                        hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
        >
            <CardContent className="p-8">
                {/* Tag */}
                <div className={`inline-block px-4 py-1 rounded-full ${c.tagBg} mb-4`}>
                    <span className={`font-semibold ${c.tagText}`}>{level}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {title}
                </h3>

                {/* Grade */}
                <p className="text-gray-600 mb-6">{grade}</p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-8">
                    {points.map((p, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle2
                                size={22}
                                style={{ color: c.icon }}
                                className="mt-0.5"
                            />
                            <span className="text-gray-700 text-lg">
                                {p}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <Button 
                    className={`w-full py-6 text-lg text-white rounded-xl ${buttonColor}`}
                    onClick={onClick}
                >
                    Enroll Now
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProgramCard;
