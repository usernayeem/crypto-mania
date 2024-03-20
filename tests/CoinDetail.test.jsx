import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route } from "react-router-dom";
import CoinDetail from "../components/CoinDetail";

// Mock the useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    coinId: "bitcoin",
  }),
}));

beforeEach(() => {
  fetch.resetMocks();
});

// Test 1: Component renders without crashing
test("renders without crashing", async () => {
  fetch.mockResponseOnce(JSON.stringify({ id: "bitcoin" }));

  render(
    <MemoryRouter initialEntries={["/coin/bitcoin"]}>
      <CoinDetail />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText(/bitcoin/i)).toBeInTheDocument());
});

// Test 2: Displays loading state correctly (if applicable)
// Note: You might need to adjust or add a loading state in your component for this test

// Test 3: Fetches coin data successfully and displays it
test("fetches coin data successfully and displays 24h high", async () => {
  const mockData = {
    id: "bitcoin",
    market_data: {
      high_24h: { usd: 50000 },
      low_24h: { usd: 48000 },
      market_cap: { usd: 600000000 },
    },
  };

  fetch.mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter>
      <CoinDetail />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText("$50,000")).toBeInTheDocument());
});

// Test 4: Handles API fetch error gracefully
test("handles API fetch error gracefully", async () => {
  fetch.mockReject(() => Promise.reject("API failure"));

  render(
    <MemoryRouter>
      <CoinDetail />
    </MemoryRouter>
  );

  // You'll need to adjust this based on how your component handles errors
  // For example, check for an error message in the DOM
});

// Test 5: Checks if correct API URL is called
test("checks if correct API URL is called", async () => {
  const mockData = { id: "bitcoin" };
  fetch.mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter initialEntries={["/coin/bitcoin"]}>
      <CoinDetail />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    )
  );
});

// Test 6-10: Implement additional tests focusing on different aspects of the component:
// - Rendering of 24h low
// - Rendering of market cap
// - Proper rendering with empty/null data
// - Proper unmounting and cleanup to prevent memory leaks
// - Component re-fetches data if the `coinId` param changes

// These tests would follow a similar structure to the tests above, focusing on each specific aspect.
