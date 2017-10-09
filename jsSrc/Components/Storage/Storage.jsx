import React from 'react';
import {storagePhotoData} from './StoragePhotoData';
import {storageVideoData} from './StorageVideoData';
import {storageAchievementData} from './StorageAchievementData';

export default function Storage(props) {

  let photoStoreArr = storagePhotoData.map((photo) => (
    <li className='storage__list-item'
        key={photo.url}>
      <a className='storage__link'
         href={photo.url}
         target='_blank'>
        {photo.name}
      </a>
    </li>
  ));

  let videoStoreArr = storageVideoData.map((video) => (
    <li className='storage__list-item'
        key={video.url}>
      <a className='storage__link'
         href={video.url}
         target='_blank'>
        {video.name}
      </a>
    </li>
  ));

  let achievementStoreArr = storageAchievementData.map((achievement, i) => (
    <div className='achievement'
         style={{
           backgroundImage: `url(${achievement.image})`,
         }}
         key={`${achievement}${i}`}>
      <div className='achievement__text'
           dangerouslySetInnerHTML={{
             __html: achievement.text
           }} />
    </div>
  ));

  return (
    <div className='tupichok__tab-pad'>
      <div className='storage'>

        <div className='storage__title'>
          Наши фото альбомы
        </div>
        <ul className='storage__list'>
          {photoStoreArr}
        </ul>

        <div className='storage__title'>
          Наше видео
        </div>
        <ul className='storage__list'>
          {videoStoreArr}
        </ul>


        <div className='storage__title'>
          Доступные достижения
        </div>
        {achievementStoreArr}
      </div>
    </div>
  )
}