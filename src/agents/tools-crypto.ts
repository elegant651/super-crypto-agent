import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
// import { getAggregates, getFinancials, getNews, getTickerSnapshot } from "@/lib/polygon";
import { getAggregates, getFinancials, getNews, getTickerSnapshot } from "@/lib/polygon-crypto";

export const tools = [
  new DynamicStructuredTool({
    name: "getMyBalance",
    description: "Retrieves balance data for a given crypto ticker.",
    schema: z.object({
      ticker: z.string().describe("The crypto ticker symbol"),
    }),
    func: async ({ ticker }) => {
      // const data = await getFinancials(ticker);
      // return JSON.stringify(data);
      return JSON.stringify({
        balance: {
          crypto: 0.0747,
          fiat: 196.42,
        },
      })
    },
  }),
  new DynamicStructuredTool({
    name: "getSwap",
    description: "Retrieves swap view for a given crypto ticker. Use this information to answer concisely",
    schema: z.object({
      ticker: z.string().describe("The crypto ticker symbol"),
    }),
    func: async ({ ticker }) => {
      // const data = await getNews(ticker);
      // return JSON.stringify(data);
      return JSON.stringify({
        balance: {
          crypto: 1000,
          fiat: 10000,
        },
      })
    },
  }),

  new DynamicStructuredTool({
    name: "getCryptoPriceHistory",
    description: "Retrieves historical crypto price data for a given crypto ticker over a specified time period.",
    schema: z.object({
      ticker: z.string().describe("The crypto ticker symbol"),
      from: z.string().describe("The start date for the crypto price data"),
      to: z.string().describe("The end date for the crypto price data"),
    }),
    func: async ({ ticker, from, to }) => {
      const data = await getAggregates(ticker, from, to);
      return JSON.stringify(data);
    },
  }),

  new DynamicStructuredTool({
    name: "getLatestPrice",
    description: "Retrieves the latest price for a given crypto ticker.",
    schema: z.object({
      ticker: z.string().describe("The crypto ticker symbol"),
    }),
    func: async ({ ticker }) => {
      const data = await getTickerSnapshot(ticker);
      return JSON.stringify(data);
    },
  }),
];