/**
 * Страничка склада. Фоточки, видосики, ачивочки, вот это всё.
 */

import React, {PureComponent} from 'react';
import { fetchJSON } from '../../Middleware/utils';

export default class Storage extends PureComponent {

  state = {
    storageAchievementData: null,
    storageVideoData: null,
    storagePhotoData: null,
  };

  componentDidMount() {
    (async () => {
      this.setState({
        storageAchievementData: await fetchJSON('dataSource/StorageAchievementData.json?v=t' + Date.now()),
        storageVideoData: await fetchJSON('dataSource/StorageVideoData.json?v=t' + Date.now()),
        storagePhotoData: await fetchJSON('dataSource/StoragePhotoData.json?v=t' + Date.now()),
      });
    })();
  }

  render() {

    const {
      storageAchievementData,
      storageVideoData,
      storagePhotoData,
    } = this.state;

    if (storageAchievementData
      && storageVideoData
      && storagePhotoData) {

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
               }}/>
        </div>
      ));

      return (
        <div className='storage__tab-pad'
             id='storage'>
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
    } else {
      return null;
    }
  }
}