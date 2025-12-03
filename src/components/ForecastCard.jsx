export function ForecastCard({ day, dateStr, isDark }) {
  // Parsear la fecha de formato YYYY-MM-DD
  const [year, month, date] = dateStr.split("-").map(Number);
  const fecha = new Date(year, month - 1, date);
  const nombreDia = fecha.toLocaleDateString("es-ES", { weekday: "short" });
  const numeroDia = fecha.getDate();

  return (
    <div
      className={`border rounded-lg p-4 text-center transition-all duration-200 shadow-sm ${
        isDark
          ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <p
        className={`font-semibold text-sm mb-3 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {nombreDia} {numeroDia}
      </p>
      <img
        src={day.condition.icon}
        alt={day.condition.text}
        className="w-14 h-14 mx-auto mb-3"
      />
      <p
        className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {day.condition.text}
      </p>
      <div
        className={`flex justify-around text-sm border-t pt-3 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div>
          <p
            className={`font-bold text-lg ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {day.maxtemp_c}°
          </p>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Máx
          </p>
        </div>
        <div>
          <p
            className={`font-bold text-lg ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {day.mintemp_c}°
          </p>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Mín
          </p>
        </div>
      </div>
    </div>
  );
}
