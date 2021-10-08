import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const useStyles = makeStyles(styles);

const Text = ({ children, align }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="h6" color="primary" align={align || 'center'}>
      {children}
    </Typography>
  );
};

export default function PoolsHeader(props) {
  const { t } = useTranslation();
  return (
    <Grid container className={props.className}>
      <Grid item xs={6} md={4}>
        <Text align="left">{t('Header-Vaults')}</Text>
      </Grid>
      <Hidden smDown>
        <Grid item md={2}>
          <Text>{t('Header-Ballance')}</Text>
        </Grid>
        <Grid item md={2}>
          <Text>{t('Header-Deposited')}</Text>
        </Grid>
        <Grid item md={1}>
          <Text>{t('Header-APY')}</Text>
        </Grid>
        <Grid item md={1}>
          <Text>{t('Header-Daily')}</Text>
        </Grid>
        <Grid item md={2}>
          <Text>{t('Header-TVL')}</Text>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item xs={6}></Grid>
      </Hidden>
    </Grid>
  );
}
