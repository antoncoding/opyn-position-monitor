import { assetDataUtils } from '@0x/order-utils';

import { WETH } from '../constants/contracts';

import { toTokenUnitsBN } from './number';

const Promise = require('bluebird');

const endpoint = 'https://api.0x.org/';

/**
 * get orderbook: BASE:QUOTE
 * @param {string} base
 * @param {string} quote
 * @return {Promise<{
  bids: {total: number, page: number, perPage: number, records: {
    order: {
      signature: string,
      senderAddress: string,
      makerAddress: string,
      takerAddress: string,
      makerFee: string,
      takerFee: string,
      makerAssetAmount: string,
      takerAssetAmount: string,
      makerAssetData: string,
      takerAssetData: string,
      salt: string,
      exchangeAddress: string,
      feeRecipientAddress: string,
      expirationTimeSeconds: string,
      makerFeeAssetData: string,
      chainId: number,
      takerFeeAssetData: string
    },
    metaData: {
      orderHash: string,
      remainingFillableTakerAssetAmount: string
    }
  }[]},
  asks: {total: number, page: number, perPage: number, records: {
    order: {
      signature: string,
      senderAddress: string,
      makerAddress: string,
      takerAddress: string,
      makerFee: string,
      takerFee: string,
      makerAssetAmount: string,
      takerAssetAmount: string,
      makerAssetData: string,
      takerAssetData: string,
      salt: string,
      exchangeAddress: string,
      feeRecipientAddress: string,
      expirationTimeSeconds: string,
      makerFeeAssetData: string,
      chainId: number,
      takerFeeAssetData: string
    },
    metaData: {
      orderHash: string,
      remainingFillableTakerAssetAmount: string
    }
  }[]}
}>}
 */
export async function getOrderBook(base, quote) {
  const baseAsset = assetDataUtils.encodeERC20AssetData(base);
  const quoteAsset = assetDataUtils.encodeERC20AssetData(quote);
  return request(`sra/v3/orderbook?baseAssetData=${baseAsset}&quoteAssetData=${quoteAsset}&perPage=${100}`);
}

/**
 * get oToken:WETH stats (v1) for all options
 * @param {Array<{addr:string, decimals:number}>} options
 * @return {Promise<Arrya< option: address, bestAsk: BigNumber, bestAsk:BigNumber >>}
 */
export async function getBasePairAskAndBids(options) {
  const bestAskAndBids = await Promise.map(options, async ({ addr: option, decimals }) => {
    const { asks, bids } = await getOrderBook(option, WETH);
    const { makerAssetAmount: askTokenAmt, takerAssetAmount: askWETHAmt } = asks.records[0].order;

    const { makerAssetAmount: bidWETHAmt, takerAssetAmount: bidTokenAmt } = bids.records[0].order;
    const bestAsk = toTokenUnitsBN(askWETHAmt, 18).div(toTokenUnitsBN(askTokenAmt, decimals));
    const bestBid = toTokenUnitsBN(bidWETHAmt, 18).div(toTokenUnitsBN(bidTokenAmt, decimals));
    return { option, bestAsk, bestBid };
  });
  return bestAskAndBids;
}

/**
 *
 * @param {string} path
 */
async function request(path) {
  const res = await fetch(`${endpoint}${path}`);
  return res.json();
}

export function connectWebSocket(_orders, setBuyOrders) {
  const socket = new WebSocket('wss://api.0x.org/sra/v3');
  socket.onopen = function () {
    // console.log(`socket open ${e}`);
    socket.send(JSON.stringify({
      type: 'subscribe',
      channel: 'orders',
      requestId: '123e4567-e89b-12d3-a456-426655440000',
      makerAssetProxyId: '0xf47261b0',
      makerAssetData: '0x6b175474e89094c44da98b954eedeac495271d0f',
      takerAssetProxyId: '0xf47261b0',
      takerAssetData: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    }));
  };
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const entry = data.payload[0];

    const newOrders = _orders.concat(entry);
    setBuyOrders(newOrders);
  };
}

/**
 * Convert ERC20 token address to 0x ERC20 asset ID
 * @param {srting} erc20_address hex addres contain 0x
 * @return {string}
 */
// function toERC20AssetId(erc20_address) {
//   return ERC20_ASSET_PROXY_ID.padEnd(34, '0').concat(erc20_address.slice(2));
// }