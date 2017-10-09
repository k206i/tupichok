import React from 'react';
import PropTypes from 'prop-types';
import {tabsData} from './TabsData';

export default function Tabs(props) {

  const onTabClick = (event) => {
    props.setTab(event.target.dataset.tabName);
  };

  let tabsArr = tabsData.map((tab, i) => (
    <label className=
             {`tupichok__tabs-item ${
               tab.tabName === props.currentTabName
                 ? 'tupichok__tabs-item_current'
                 : ''}`}
           data-tab-name={tab.tabName}
           onClick={onTabClick}
           key={`${tab.tabName}${i}`}>
      {tab.tabLabel}
    </label>
  ));

  return (
    <div className='tupichok__tabs'>
      {tabsArr}
    </div>
  )
}

Tabs.propTypes = {
  setTab: PropTypes.func.isRequired,
  currentTabName: PropTypes.string,
};
