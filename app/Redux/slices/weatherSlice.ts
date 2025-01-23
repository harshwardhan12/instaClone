import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../../Interfaces/weather'; // Adjust path as needed

// Define the initial state using the WeatherData interface
const initialState: WeatherData = {
    location: {
        name: '',
        region: '',
        country: '',
        lat: 0,
        lon: 0,
        tz_id: '',
        localtime_epoch: 0,
        localtime: '',
    },
    current: {
        last_updated_epoch: 0,
        last_updated: '',
        temp_c: 0,
        temp_f: 0,
        is_day: 0,
        condition: {
            text: '',
            icon: '',
            code: 0,
        },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 0,
        wind_dir: '',
        pressure_mb: 0,
        pressure_in: 0,
        precip_mm: 0,
        precip_in: 0,
        humidity: 0,
        cloud: 0,
        feelslike_c: 0,
        feelslike_f: 0,
        windchill_c: 0,
        windchill_f: 0,
        heatindex_c: 0,
        heatindex_f: 0,
        dewpoint_c: 0,
        dewpoint_f: 0,
        vis_km: 0,
        vis_miles: 0,
        uv: 0,
        gust_mph: 0,
        gust_kph: 0,
    },
};

// Create the weather slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateWeather(state, action: PayloadAction<WeatherData>) {
            return { ...action.payload }; // Update the entire weather data
        },
        updateLocation(state, action: PayloadAction<WeatherData['location']>) {
            state.location = action.payload; // Update only the location
        },
        updateCurrent(state, action: PayloadAction<WeatherData['current']>) {
            state.current = action.payload; // Update only the current weather
        },
    },
});

// Export actions and reducer
export const { updateWeather, updateLocation, updateCurrent } = weatherSlice.actions;
export default weatherSlice.reducer;
