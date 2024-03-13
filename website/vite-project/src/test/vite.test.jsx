import { describe, it, expect, vi } from 'vitest';
import { fetchAndCalculateAverages, fetchDataPoints } from '../utils/utils';


vi.stubGlobal("fetch", vi.fn());

describe("fetchAndCalculateAverages", () => {
  it("correctly calculates averages from file paths", async () => {

    const mockResponses = {
      "/csv/film1.csv": "date,time,value\n2024-03-08,23:21:30,204\n2024-03-08,23:21:31,210",
      "/csv/film2.csv": "date,time,value\n2024-03-08,23:21:32,208\n2024-03-08,23:21:33,212",
    };

    global.fetch.mockImplementation((url) =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockResponses[url]),
      })
    );

    const expectedAverages = {
      "film1": 207, 
      "film2": 210, 
    };

   
    const averages = await fetchAndCalculateAverages(Object.keys(mockResponses));

    expect(averages).toEqual(expectedAverages);
  });
});

describe('fetchDataPoints', () => {
  it("correctly fetches and processes CSV data", async () => {
    // Prepare the mock CSV content
    const mockCSVContent = "date,time,value\n2024-03-08,23:21:30,204\n2024-03-08,23:21:31,210";

    // Mock fetch to resolve with the mock CSV content
    global.fetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockCSVContent),
    });

    // Expected data points based on the mock CSV content
    const expectedDataPoints = [
      { time: '23:21:30', value: 204 },
      { time: '23:21:31', value: 210 },
    ];

  
    const dataPoints = await fetchDataPoints(mockCSVContent);

    
    expect(dataPoints).toEqual(expectedDataPoints);
  });
});