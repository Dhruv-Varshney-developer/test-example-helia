# test-example-helia

Example for customizing fetch requests with custom headers using Trustless Gateway Block Broker

## Prerequisites

- Node.js version 22 or higher

## Setup

1. Clone this repository
2. Run `npm install`
3. Run `node test.js`

## What this example demonstrates

This example shows how to use Helia's Trustless Gateway Block Broker to customize HTTP requests to IPFS gateways. Specifically, it demonstrates:

- Adding custom headers (like User-Agent) to gateway requests
- Using the `transformRequestInit` function to modify fetch parameters
- Fetching content from IPFS using the customized gateway configuration

## Expected output

When you run the test, you should see:
- Helia initialization
- Custom headers being applied during block fetching
- Successful content retrieval from IPFS
- Content details (length and preview)

## Note

This is a standalone test repository to verify the example code that will be included in the official Helia documentation.

## Links

- [Helia Project](https://github.com/ipfs/helia)
- [Block Brokers Package](https://github.com/ipfs/helia/tree/main/packages/block-brokers)
- [Reference issue](https://github.com/ipfs/helia/issues/757)