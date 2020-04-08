/* eslint-disable import/prefer-default-export */
// THIS IS FAKE DATA => JUST TO TEST 0x APIS
export const mock_eth_puts = [
  {
    addr: '0x6b175474e89094c44da98b954eedeac495271d0f', // its' actually dai
    title: 'ETH Put $100 04/03/20',

    // constants in contract
    symbol: 'oETH $100 Put',
    name: 'Opyn ETH Put $100 04/03/20',
    decimals: 18,
    oracle: '0x7054e08461e3eCb7718B63540adDB3c3A1746415',
    collateral: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    underlying: '0x0000000000000000000000000000000000000000',
    strike: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    strikePrice: 1e-6,
    minRatio: 1,
    exchange: '0x39246c4f3f6592c974ebc44f80ba6dc69b817c71',
    uniswapExchange: '0x30651Fc7F912f5E40AB22F3D34C2159431Fb1c4F',
    expiry: 1585958340,
  },
  {
    addr: '0xe41d2489571d322189246dafa5ebde1f4699f498', // it's actually zrx
    title: 'ETH Put $100 04/24/20',

    // constants in contract
    symbol: 'oETH $100 Put',
    name: 'Opyn ETH Put $100 04/24/20',
    decimals: 18,
    oracle: '0x7054e08461e3eCb7718B63540adDB3c3A1746415',
    collateral: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    underlying: '0x0000000000000000000000000000000000000000',
    strike: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    strikePrice: 1e-6,
    minRatio: 1,
    exchange: '0x39246c4f3f6592c974ebc44f80ba6dc69b817c71',
    uniswapExchange: '0x5734a78b1985B47dF3fbf1736c278F57c2C30983',
    expiry: 1587715200,
  },
];