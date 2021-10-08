import { formatApy } from './format';

let trimReg = /(^\s*)|(\s*$)/g;

export function isEmpty(key) {
  if (key === undefined || key === '' || key === null) {
    return true;
  }
  if (typeof key === 'string') {
    key = key.replace(trimReg, '');
    return key === '' || key === null || key === 'null' || key === undefined || key === 'undefined';
  } else if (typeof key === 'undefined') {
    return true;
  } else if (typeof key == 'object') {
    for (let i in key) {
      return false;
    }
    return true;
  } else if (typeof key == 'boolean') {
    return false;
  }
}

// Index an array of objects by key
export function indexBy(array, key) {
  return Object.fromEntries(array.map(item => [item[key], item]));
}

// const HarvestBlacklistVaultIds = [
//   'bifi-maxi',
//   'fortube-fil',
//   'fortube-atom',
//   'fortube-xtz',
//   'fortube-busd',
//   'fortube-link',
//   'fortube-dot',
//   'fortube-usdt',
//   'fortube-eth',
//   'fortube-btcb',
//   'fry-burger-v2',
// ];

export const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

const yearlyToDaily = apy => {
  const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;

  if (isNaN(g)) {
    return 0;
  }

  return g;
};

export const getApyStats = apy => {
  const values = {};
  let needsApyTooltip = false;
  let needsDailyTooltip = false;

  values.totalApy = apy.totalApy;

  if ('vaultApr' in apy && apy.vaultApr) {
    needsApyTooltip = true;
    values.vaultApr = apy.vaultApr;
    values.vaultDaily = apy.vaultApr / 365;
  }

  if ('tradingApr' in apy && apy.tradingApr) {
    needsApyTooltip = true;
    needsDailyTooltip = true;
    values.tradingApr = apy.tradingApr;
    values.tradingDaily = apy.tradingApr / 365;
  }

  if ('vaultAprDaily' in values || 'tradingAprDaily' in values) {
    values.totalDaily = (values.vaultDaily || 0) + (values.tradingDaily || 0);
  } else {
    values.totalDaily = yearlyToDaily(values.totalApy);
  }

  const formatted = Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      const formattedValue = key.toLowerCase().includes('daily')
        ? formatApy(value, 4)
        : formatApy(value);
      return [key, formattedValue];
    })
  );

  return { values, formatted, needsApyTooltip, needsDailyTooltip };
};
