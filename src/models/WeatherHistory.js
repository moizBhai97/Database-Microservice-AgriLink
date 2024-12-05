const mongoose = require('mongoose');

const WeatherHistorySchema = new mongoose.Schema({
    forecast: {
        forecastday: [
            {
                date: { type: String, required: true },
                day: {
                    maxtemp_c: { type: Number, required: true },
                    mintemp_c: { type: Number, required: true },
                    avghumidity: { type: Number, required: true },
                    maxwind_kph: { type: Number, required: true },
                    condition: {
                        text: { type: String, required: true }
                    },
                    uv: { type: Number, required: true }
                },
                astro: {
                    sunrise: { type: String, required: true },
                    sunset: { type: String, required: true }
                }
            }
        ]
    }
}, { timestamps: true });

module.exports = mongoose.model('WeatherHistory', WeatherHistorySchema);