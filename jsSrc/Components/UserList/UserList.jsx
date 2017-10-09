/**
 * Генерация списка тупикчан с ачивками и всеми делами.
 */

import React from 'react';
import {sitizens} from './UserListData';
import {storageAchievementData} from '../Storage/StorageAchievementData';

export default function UserList(props) {

  let sortSitizens = (a, b) => {
    const currentDateA = (a.isOnline)
      ? new Date()
      : a.endDate;

    const currentDateB = (b.isOnline)
      ? new Date()
      : b.endDate;

    return  (currentDateB.getTime() - b.startDate.getTime()) - (currentDateA.getTime() - a.startDate.getTime());
  };

  sitizens.sort(sortSitizens);

  // Генерация карточки каждого тупикчанина
  let sitizensArr = sitizens.map((user, i) => {

    const currentDate = (user.isOnline)
      ? new Date()
      : user.endDate;

    // Уровень пользователя == количеству полных лет с момента начала работы в Тупичке
    const currentUserLevel =  Math.floor((currentDate.getTime() - user.startDate.getTime()) / 31536000000);

    const levelColor = currentUserLevel >= 10
      ? 'orange'
      : currentUserLevel >= 5
        ? 'red'
        : currentUserLevel >= 2
          ? 'green'
          : null;

    // Генерация ачивок
    let achievements = user.achievements.map((achievement) => {

      let achievementData = storageAchievementData.find((element) => (
        element.name == achievement
      ));

      return (
        <div className='achievement'
             style={{
               backgroundImage: `url(${achievementData.image})`,
             }}
             key={`${achievement}${i}`}>
          <div className='achievement__text'
               dangerouslySetInnerHTML={{
                 __html: achievementData.text
               }}/>
        </div>
      )
      }
    );

    return (
      <div className='sitizen' key={`${user.username}${i}`}>
        <img className='sitizen__userpic' src={user.userpic} />
        <div className={`sitizen__status ${
          user.isOnline
            ? 'online'
            : null
          }`} />
        <div className='sitizen__level'>
          Уровень
          <span className={`sitizen__level-count ${levelColor}`}>
            {currentUserLevel}
          </span>
        </div>
        <div className='sitizen__username'>
          {user.username}
        </div>
        <div className='sitizen__status-text'>
          в сети: с {`${user.startDate.getMonth() + 1}.${user.startDate.getFullYear()} `}
          {!user.isOnline &&
            <span>
              по {`${user.endDate.getMonth() + 1}.${user.endDate.getFullYear()}`}
            </span>}
        </div>

        {achievements}

        {currentUserLevel >= 2 &&
        <div className='achievement achievement_two-year'>
          <div className='achievement__text'
               dangerouslySetInnerHTML={{
                 __html: storageAchievementData.find((element) => (
                   element.name == 'two-year'
                 )).text
               }}/>
        </div>}

        {currentUserLevel >= 5 &&
        <div className='achievement achievement_five-year'>
          <div className='achievement__text'
               dangerouslySetInnerHTML={{
                 __html: storageAchievementData.find((element) => (
                   element.name == 'five-year'
                 )).text
               }}/>
        </div>}

        {currentUserLevel >= 10 &&
        <div className='achievement achievement_ten-year'>
          <div className='achievement__text'
               dangerouslySetInnerHTML={{
                 __html: storageAchievementData.find((element) => (
                   element.name == 'ten-year'
                 )).text
               }}/>
        </div>}

      </div>
    )
  });
  
  return (
    <div className='sitizen__tab-pad'>
      {sitizensArr}
    </div>
  )
}