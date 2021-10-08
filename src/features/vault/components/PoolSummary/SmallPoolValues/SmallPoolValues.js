import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import LabeledStat from '../LabeledStat/LabeledStat';
import { formatTvl } from 'features/helpers/format';
import { formatDecimals, getApyStats } from 'features/helpers/utils';
import LabeledStatWithTooltip from '../LabeledStatWithTooltip/LabeledStatWithTooltip';
import { makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

const SmallPoolValues = ({
  apy,
  pool,
  balanceSingle,
  balanceUsd,
  deposited,
  depositedUsd,
  fetchBalancesDone,
  fetchVaultsDataDone,
  fetchApysDone,
  isLoading,
}) => {
  const { formatted } = getApyStats(apy);

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.content}>
        <Typography variant="body2" color="primary">
          {t('Header-Ballance')}
        </Typography>
        <LabeledStat
          className={classes.value}
          value={formatDecimals(balanceSingle)}
          subvalue={balanceUsd}
          isLoading={!fetchBalancesDone}
        />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Typography variant="body2" color="primary">
          {t('Header-Deposited')}
        </Typography>
        <LabeledStat
          className={classes.value}
          value={formatDecimals(deposited)}
          subvalue={depositedUsd}
          isLoading={!fetchBalancesDone}
        />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Typography variant="body2" color="primary">
          {t('Header-APY')}
        </Typography>
        <LabeledStatWithTooltip
          className={classes.value}
          value={<>{formatted.totalApy}</>}
          tooltip={null}
          boosted={''}
          isLoading={!fetchApysDone}
        />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Typography variant="body2" color="primary">
          {t('Header-TVL')}
        </Typography>
        <LabeledStat
          className={classes.value}
          value={formatTvl(pool.tvl, pool.oraclePrice)}
          isLoading={!fetchVaultsDataDone}
        />
      </Grid>
    </Grid>
  );
};

export default SmallPoolValues;
