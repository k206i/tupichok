/**
 * Всё приложение, включая обработчики событий живут здесь.
 */

import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {MAIN_NODES} from './nodes';
import UserList from './UserList/UserList';
import Storage from './Storage/Storage';
import Tabs from './Tabs/Tabs';
import * as pageActions from '../Actions/pageActions';
import {APP_READY_CSS_CLASS} from '../Constants/';

class App extends PureComponent {

  componentDidMount() {
    setTimeout(() => {
      MAIN_NODES.body.classList.add(APP_READY_CSS_CLASS);
    }, 500);

  }

  render() {

    const {
      activeTab,
    } = this.props.tupichokState;
    const {
      setTab,
    } = this.props.pageActions;

    let tabToShow;
    switch (activeTab) {
      case 'userList':
        tabToShow = <UserList />;
        break;
      case 'storage':
        tabToShow = <Storage />;
        break;
      default:
        tabToShow = <UserList />;
        break;
    }

    return (
      <div className='app'>
        <div className='tupichok'>
          <Tabs setTab={setTab}
                currentTabName={activeTab} />
          {tabToShow}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tupichokState: state.tupichok,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)