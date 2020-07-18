import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Header, DataView, IdentityBadge, Button, Tabs, Timer
} from '@aragon/ui';

import { Comment, CheckBox, GoToBalancerButton, GoToUniswapButton, TokenIcon, ProtocolIcon } from '../common';
import { getPreference, storePreference } from '../../utils/storage';
import { useOptions } from '../../hooks'
import { EthOptionList } from './EthOptionList'
import { InsuranceList } from './InsuranceList'
import * as types from '../../types'
import tracker from '../../utils/tracker';

function AllContracts() {
  useEffect(() => {
    tracker.pageview('/options/');
  }, []);

  const { isInitializing,
    insurances,
    ethCalls,
    ethPuts,
    compPuts
  } = useOptions()

  const storedOptionTab = getPreference('optionTab', '0');
  const storedShowExpired = getPreference('showExpired', '0');

  const [tabSelected, setTabSelected] = useState(parseInt(storedOptionTab, 10));
  const [showExpired, setShowExpired] = useState(storedShowExpired === '1'); // whether to show expired options
  // const [insurancePage, setInsurancePage] = useState(0)

  const history = useHistory();
  const goToToken = useCallback((addr: string) => {
    history.push(`/option/${addr}`);
  }, [history]);

  return (
    <>
      <Header primary="All Contracts" />
      <div style={{ display: 'flex' }}>
        <Comment text="Choose an option contract to proceed." />
        <div style={{ marginLeft: 'auto' }}>
          <CheckBox
            text="Expired"
            onCheck={(checked) => {
              storePreference('showExpired', checked ? '1' : '0');
              setShowExpired(checked);
            }}
            checked={showExpired}
          />
        </div>
      </div>
      <Tabs
        items={['DeFi Insurance', 'ETH Options', 'Other Options']}
        selected={tabSelected}
        onChange={(choice: number) => {
          setTabSelected(choice);
          storePreference('optionTab', choice.toString());
        }}
      />

      {tabSelected === 0 &&
        <InsuranceList 
          isInitializing={isInitializing}
          insurances={insurances}
          showExpired={showExpired}
          goToToken={goToToken}
        />
      }
      {tabSelected === 1 &&
        <EthOptionList
          isInitializing={isInitializing}
          typeText="ETH Options"
          entries={ethCalls.concat(ethPuts)}
          showExpired={showExpired}
          goToToken={goToToken}
        />}
      {tabSelected === 2 &&
        <EthOptionList
          isInitializing={isInitializing}
          typeText="Other Options"
          entries={compPuts}
          showExpired={showExpired}
          goToToken={goToToken}
        />
      }

    </>
  );
}

export default AllContracts;
