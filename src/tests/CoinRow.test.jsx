import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoinRow from "../components/CoinRow";

// Mock coin data
const mockCoinRow = {
  market_cap_rank: 1,
  name: "Bitcoin",
  symbol: "BTC",
  image: "https://someimageurl.com/bitcoin.png",
  current_price: 20000,
  price_change_percentage_24h: -5,
};

describe("CoinRow Component", () => {
  // Test 1: Renders without crashing
  test("renders without crashing", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  // Test 2: Displays the correct name
  test("displays the correct name", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  // Test 3: Displays the correct symbol in uppercase
  test("displays the correct symbol in uppercase", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  // Test 4: Displays the correct current price
  test("displays the correct current price", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    expect(screen.getByText("$20000")).toBeInTheDocument();
  });

  // Test 5: Shows a negative price change in red
  test("shows a negative price change in red", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    const priceChange = screen.getByText("-5%");
    expect(priceChange).toHaveStyle("color: red");
  });

  // Test 6: Shows a positive price change not in red
  test("shows a positive price change not in red", () => {
    const positiveChangeData = {
      ...mockCoinRow,
      price_change_percentage_24h: 5,
    };
    render(<CoinRow coinRow={positiveChangeData} />);
    const priceChange = screen.getByText("5%");
    expect(priceChange).not.toHaveStyle("color: red");
  });

  // Test 7: Renders the crypto image correctly
  test("renders the crypto image correctly", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    const image = screen.getByAltText("Crypto Image");
    expect(image).toHaveAttribute("src", mockCoinRow.image);
  });

  // Test 8: Market cap rank is rendered but hidden
  test("market cap rank is rendered but hidden", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    const marketCap = screen.getByText(mockCoinRow.market_cap_rank.toString());
    expect(marketCap).toHaveClass("hidden");
  });

  // Test 9: Renders correctly with minimal props
  test("renders correctly with minimal props", () => {
    const minimalProps = { name: "Litecoin", symbol: "LTC" };
    render(<CoinRow coinRow={minimalProps} />);
    expect(screen.getByText("LTC")).toBeInTheDocument();
    expect(screen.getByText("Litecoin")).toBeInTheDocument();
  });

  // Test 10: Price change percentage is displayed correctly
  test("price change percentage is displayed correctly", () => {
    render(<CoinRow coinRow={mockCoinRow} />);
    const priceChange = screen.getByText("-5%");
    expect(priceChange).toBeInTheDocument();
  });
});
