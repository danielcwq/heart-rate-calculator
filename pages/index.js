import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const HeartRateCalculator = () => {
  const [restingHR, setRestingHR] = useState("");
  const [maxHR, setMaxHR] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("reserve");
  const [zones, setZones] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const calculateZones = () => {
    let zoneValues = [];

    if (calculationMethod === "reserve") {
      const heartRateReserve = maxHR - restingHR;
      zoneValues = [
        // Zone 1 - 50-60% of HRR
        Math.round(restingHR + 0.5 * heartRateReserve),
        // Zone 2 - 60-70% of HRR
        Math.round(restingHR + 0.6 * heartRateReserve),
        // ... Add other zones similarly
        Math.round(restingHR + 0.7 * heartRateReserve),
        Math.round(restingHR + 0.8 * heartRateReserve),
        Math.round(restingHR + 0.9 * heartRateReserve),
        Math.round(restingHR + 1 * heartRateReserve),
      ];
    } else {
      zoneValues = [
        // Zone 1 - 50-60% of Max HR
        Math.round(0.5 * maxHR),
        // Zone 2 - 60-70% of Max HR
        Math.round(0.6 * maxHR),
        Math.round(0.7 * maxHR),
        Math.round(0.85 * maxHR),
        Math.round(0.95 * maxHR),
        Math.round(1 * maxHR),
      ];
    }

    setZones(zoneValues);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold my-3 text-center">
            Heart Rate Zone Calculator
          </h1>
          <div className="container mx-auto p-4">
            <Head>
              <title>Heart Rate Zone Calculator</title>
            </Head>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="restingHR" className="block">
                  Resting Heart Rate:
                </label>

                <input
                  id="restingHR"
                  type="number"
                  value={restingHR}
                  placeholder="Resting HR"
                  onChange={(e) => setRestingHR(Number(e.target.value))}
                  className="border p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="maxHR" className="block">
                  Maximum Heart Rate:
                </label>
                <input
                  id="maxHR"
                  type="number"
                  value={maxHR}
                  onChange={(e) => setMaxHR(Number(e.target.value))}
                  className="border p-2"
                  required
                />
              </div>
              <div>
                <label className="block">Calculation Method:</label>
                <select
                  value={calculationMethod}
                  onChange={(e) => setCalculationMethod(e.target.value)}
                  className="border p-2"
                >
                  <option value="reserve">Heart Rate Reserve</option>
                  <option value="maxHR">Max Heart Rate</option>
                </select>
              </div>
              <button
                onClick={calculateZones}
                className="bg-blue-500 text-white p-2 mt-4"
              >
                Calculate Zones
              </button>
            </form>
            {zones.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Zones:</h2>
                <ul>
                  {zones.map((zone, index) => (
                    <li key={index}>
                      Zone {index + 1} start: {zone} BPM
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-5 hover:text-blue-600">
              <Link href="https://trainingtilt.com/how-to-calculate-heart-rate-zones">
                Understanding the difference between calculation using max HR
                and heart rate reserves
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeartRateCalculator;
