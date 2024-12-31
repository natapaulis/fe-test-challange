import "vitest-fetch-mock";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { Customer } from "types";
import { CustomerListView } from "components/CustomerListView";

const customers: Customer[] = [
  {
    id: "1",
    company: "Test Company One",
    industry: "tech",
    isActive: true,
  },
  {
    id: "2",
    company: "Test Company Two",
    industry: "tech",
    isActive: false,
  },
];

describe("customer table", () => {
  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.mockResponseOnce(JSON.stringify(customers));
  });

  afterEach(() => {
    cleanup();
  });

  it("should load the customers table and show only active customers", async () => {
    render(<CustomerListView />);
    const active = await screen.findByText('Test Company One');
    expect(active).toBeTruthy();
    const inactive = screen.queryByText('Test Company Two');
    expect(inactive).toBeNull();
  });
});
