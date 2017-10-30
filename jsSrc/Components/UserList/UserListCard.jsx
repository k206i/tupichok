/**
 * Шаблон карточки тупикчанина
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createDateFromString } from '../../Middleware/utils';

export default function UserListCard(props) {

  const {
    user,
    storageAchievementData,
  } = props;


  const startDate = createDateFromString(user.startDate);
  const currentDate = (!user.endDate)
    ? new Date()
    : createDateFromString(user.endDate);

  // Уровень пользователя == количеству полных лет
  // с момента начала работы в Тупичке
  const currentUserLevel = Math.floor(
    (currentDate.getTime() - startDate.getTime()
    ) / 31536000000);

  const levelColor = currentUserLevel >= 10
    ? 'orange'
    : currentUserLevel >= 5
      ? 'red'
      : currentUserLevel >= 2
        ? 'green'
        : null;

  // Автоматические ачивки, за выслугу лет
  if (currentUserLevel >= 2) {
    user.achievements.push('two-year');
  }
  if (currentUserLevel >= 5) {
    user.achievements.push('five-year');
  }
  if (currentUserLevel >= 10) {
    user.achievements.push('ten-year');
  }

  // Генерация ачивок из storageAchievementData
  let achievements = user.achievements.map((achievement, i) => {

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
               }} />
        </div>
      )
    }
  );

  return (
    <div className='citizen'>
      <img className='citizen__userpic' src={user.userpic}/>
      <div className={`citizen__status ${
        !user.endDate
          ? 'online'
          : null
        }`}/>
      <div className='citizen__level'>
        Уровень
        <span className={`citizen__level-count ${levelColor}`}>
          {currentUserLevel.toString()}
        </span>
      </div>
      <div className='citizen__username'>
        {user.username}
      </div>
      <div className='citizen__status-text'>
        в сети: с {`${
          createDateFromString(user.startDate).getMonth() + 1
        }.${
          createDateFromString(user.startDate).getFullYear()
        } `}
        {user.endDate &&
        <span>
          по {`${
            createDateFromString(user.endDate).getMonth() + 1
          }.${
            createDateFromString(user.endDate).getFullYear()
          }`}
        </span>}
      </div>
      {user.comment &&
        <p className="citizen__comment">
          {user.comment}
        </p>}

      {achievements}

    </div>
  )
}

UserListCard.propTypes = {
  user: PropTypes.object.isRequired,
  storageAchievementData: PropTypes.array.isRequired,
};