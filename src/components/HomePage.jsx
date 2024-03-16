import BASE_URL from "../constants/base-url";
import API_KEY from "../constants/api-key";
import { useEffect, useState } from "react";
import BgImage from "../assets/bg-weather.jpg"
import WeatherImage from "../assets/weather-image.png"
import LocIcon from "../assets/location.png"
import TempIcon from "../assets/thermometer.png"
import StatusIcon from "../assets/status.png"
const homePage = () => {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);
    const [isFetching, setIsFetching] = useState(false)
    const [msgPrompt, setMsgPrompt] = useState(null)

    const handleSearch = async (e) => {
        if (!search) {
            e.preventDefault();
        } else {
            try {
                setIsFetching(true)
                const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${search}`)
                const data = await response.json()
                setWeather(data)
                console.log(data)
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
            setIsFetching(false)
        }

    }


    useEffect(() => {
        if (weather) {
            console.log(weather)
        }
        // handleSearch();
        // console.log(weather.coord)
    }, [weather])

    return (
        <div className="h-screen relative">
            <img className="absolute inset-0 w-full h-full object-cover" src={BgImage} alt="Background_image" />
            <div className="absolute inset-0 flex flex-col items-center content-center p-4 gap-4 bg-black bg-opacity-20">
                <h1 className="text-3xl tracking-wider text-white">
                    Weather Today
                </h1>
                <div className="relative z-10">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="rounded-lg border border-gray-400 mr-2 indent-2 text-black"
                        placeholder="e.g Naga City"
                        required
                    />
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="bg-cyan-600 px-4 rounded-md text-white hover:opacity-65"
                        disabled={isFetching}
                    >
                        {isFetching ? "Searching..." : "Search"}
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 flex justify-center items-end gap-4 w-full mb-5">
                <div className="flex justify-between rounded-lg border border-gray-100 w-1/6 bg-slate-200 shadow-sm transition hover:shadow-lg sm:p-6">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold tracking-wider text-gray-700">
                            Location
                        </h3>
                        {weather && (
                            <div>
                                {/* Conditional rendering of coords when weather is available */}
                                <p>{weather.location.name}, {weather.location.country}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        <img className="h-8" src={LocIcon} alt="Location-icon" />
                    </div>
                </div>
                <div className="flex justify-between rounded-lg border border-gray-100 w-1/6 bg-slate-200 shadow-sm transition hover:shadow-lg sm:p-6">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold tracking-wider text-gray-700">
                            Temperature
                        </h3>
                        {weather && (
                            <div>
                                {/* Conditional rendering of temperature when weather is available/truthy */}
                                <p>{weather.current.temp_c}°C</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        <img className="h-8" src={TempIcon} alt="Location-icon" />
                    </div>
                </div>
                <div className="flex justify-between rounded-lg border border-gray-100 w-1/6 bg-slate-200 shadow-sm transition hover:shadow-lg sm:p-6">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold tracking-wider text-gray-700">
                            Description
                        </h3>
                        {weather && (
                            <div>
                                {/* Conditional rendering of temperature when weather is available/truthy */}
                                <p>{weather.current.condition.text}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        <img className="h-8" src={StatusIcon} alt="Location-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default homePage;