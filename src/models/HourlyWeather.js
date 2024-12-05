const mongoose = require('mongoose');

const HourlyWeatherSchema = new mongoose.Schema({
    current: {
        temp_c: { type: Number, required: true },
        condition: {
            text: { type: String, required: true }
        },
        wind_kph: { type: Number, required: true },
        humidity: { type: Number, required: true },
        vis_km: { type: Number, required: true }
    },
    forecast: {
        forecastday: [
            {
                hour: [
                    {
                        time: { type: String, required: true },
                        temp_c: { type: Number, required: true },
                        humidity: { type: Number, required: true },
                        wind_kph: { type: Number, required: true }
                    }
                ]
            }
        ]
    }
}, { timestamps: true });

module.exports = mongoose.model('HourlyWeather', HourlyWeatherSchema);