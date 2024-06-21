import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Coins from "../components/Coins";
import { BrowserRouter as Router } from "react-router-dom";

// Helper function to wrap Coins with Router
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

describe("Coins Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Test 1: Renders without crashing and fetches coins data
  test("fetches coins data and renders without crashing", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          current_price: 20000,
          price_change_percentage_24h: -5,
        },
      ])
    );
    renderWithRouter(<Coins />);
    await waitFor(() =>
      expect(screen.getByText("Bitcoin")).toBeInTheDocument()
    );
  });

  // Test 2: Correctly renders a list of coins
  test("correctly renders a list of coins", async () => {
    const mockCoins = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        current_price: 20000,
        price_change_percentage_24h: -5,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        current_price: 1000,
        price_change_percentage_24h: 2,
      },
    ];
    fetch.mockResponses([JSON.stringify(mockCoins), { status: 200 }]);
    renderWithRouter(<Coins />);
    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
    });
  });

  // Test 3: Displays pagination component
  test("displays pagination component", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(
        Array(20).fill({
          id: "testcoin",
          name: "Test Coin",
          symbol: "TC",
          current_price: 100,
          price_change_percentage_24h: 0,
        })
      )
    );
    renderWithRouter(<Coins />);
    await waitFor(() =>
      expect(screen.getByRole("navigation")).toBeInTheDocument()
    );
  });

  // Test 4: Changes page when a pagination button is clicked
  test("changes page when a pagination button is clicked", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(
        Array(20).fill({
          id: "testcoin",
          name: "Test Coin",
          symbol: "TC",
          current_price: 100,
          price_change_percentage_24h: 0,
        })
      )
    );
    renderWithRouter(<Coins />);
    const paginationButton = await screen.findByText("2");
    userEvent.click(paginationButton);
    await waitFor(() =>
      expect(screen.getByRole("navigation")).toBeInTheDocument()
    );
  });

  // Test 5: Properly handles API fetch error
  test("properly handles API fetch error", async () => {
    fetch.mockReject(() => Promise.reject("API failure"));
    renderWithRouter(<Coins />);
    // You'll need to adjust this based on how your component handles errors
    // For example, you might check for an error message in the DOM
  });

  // Test 6: Renders loading state while fetching coins (if applicable)
  // Note: Implement this test if you have a loading state

  // Test 7: Correctly slices coins array for pagination
  // This test assumes your component slices the coins array based on pagination
  // You might need to adjust based on your implementation
});
