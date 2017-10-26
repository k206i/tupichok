/**
 * Генерация списка тупикчан с ачивками и всеми делами.
 */

import React, {PureComponent} from 'react';
import { fetchJSON } from '../../Middleware/utils';
import UserListCard from './UserListCard';


export default class UserList extends PureComponent {

  state = {
    citizens: null,
    storageAchievementData: null,
  };

  componentDidMount() {
    (async () => {
      this.setState({
        citizens: await fetchJSON('dataSource/UserListData.json?v=t' + Date.now()),
        storageAchievementData: await fetchJSON('dataSource/StorageAchievementData.json?v=t' + Date.now()),
      });
    })();
  }

  render() {

    const {
      citizens,
      storageAchievementData,
    } = this.state;

    if (citizens) {

      let sortcitizens = (a, b) => {

        const startDateA = new Date(a.startDate);
        const currentDateA = (!a.endDate)
          ? new Date()
          : new Date(a.endDate);

        const startDateB = new Date(b.startDate);
        const currentDateB = (!b.endDate)
          ? new Date()
          : new Date(b.endDate);

        return (currentDateB.getTime() - startDateB.getTime()) - (currentDateA.getTime() - startDateA.getTime());
      };

      citizens.sort(sortcitizens);

      // Генерация карточки каждого тупикчанина
      let citizensArr = citizens.map((user, i) => (
        <UserListCard user={user}
                      storageAchievementData={storageAchievementData}
                      key={`${user.username}${i}`} />
      ));

      return (
        <div className='citizen__tab-pad'
             id='userList'>
          {citizensArr}
        </div>
      )
    } else {
      return null;
    }
  }
}