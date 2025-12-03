import { ciudad$, clima$ } from "./api/weatherService";
import { useObservable } from "./hooks/useObservable";
import { useDarkMode } from "./hooks/useDarkMode";
import { ForecastCard } from "./components/ForecastCard";

export default function App() {
  const clima = useObservable(clima$, null);
  const { isDark, toggleDarkMode } = useDarkMode();

  const cambiarCiudad = (e) => {
    ciudad$.next(e.target.value);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      } p-6 w-screen`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header con botón de tema */}
        <div
          className={`mb-8 border-b pb-6 flex justify-between items-center ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div>
            <h1
              className={`text-4xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Clima
            </h1>
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Pronóstico del clima en tiempo real
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isDark
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            title={isDark ? "Modo claro" : "Modo oscuro"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Input de búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Busca una ciudad..."
            onChange={cambiarCiudad}
            className={`w-full md:w-96 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isDark
                ? "bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-gray-600"
                : "bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-gray-900"
            } focus:outline-none`}
          />
        </div>

        {clima ? (
          <>
            {/* Clima Actual */}
            <div
              className={`rounded-xl p-8 mb-8 shadow-sm transition-colors duration-200 ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border`}
            >
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2
                    className={`text-3xl font-bold mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {clima.location.name}
                  </h2>
                  <p
                    className={`text-lg mb-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {clima.location.country}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {new Date(clima.current.last_updated).toLocaleDateString(
                      "es-ES",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end justify-center">
                  <div className="mb-4">
                    <img
                      src={clima.current.condition.icon}
                      alt=""
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>

              {/* Información detallada */}
              <div className="grid md:grid-cols-3 gap-6">
                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Temperatura
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {Math.round(clima.current.temp_c)}°
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {clima.current.condition.text}
                  </p>
                </div>

                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Sensación
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {Math.round(clima.current.feelslike_c)}°
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Se siente como
                  </p>
                </div>

                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Humedad
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {clima.current.humidity}%
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Relativa
                  </p>
                </div>

                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Viento
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {Math.round(clima.current.wind_kph)}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    km/h
                  </p>
                </div>

                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Presión
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {Math.round(clima.current.pressure_mb)}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    mb
                  </p>
                </div>

                <div
                  className={`border-l-4 pl-4 ${
                    isDark ? "border-yellow-400" : "border-gray-900"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Índice UV
                  </p>
                  <p
                    className={`text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {clima.current.uv.toFixed(1)}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Radiación
                  </p>
                </div>
              </div>
            </div>

            {/* Pronóstico de 5 días */}
            {clima.forecast && (
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Próximos 5 días
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {clima.forecast.forecastday.map((day) => (
                    <ForecastCard
                      key={day.date}
                      day={day.day}
                      dateStr={day.date}
                      isDark={isDark}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Escribe una ciudad para ver el clima
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
