import React from 'react';

const VideoBanner: React.FC = () => {
  return (
    <div className='w-full'>
      <video width='100%' poster='https://twgtea.com/Files/Images/Brand-film-thumbnail-2-2.jpg' controls className='focus:ring-0'>
        <source src='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' type='video/mp4' />
        <source src='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' type='video/ogg' />
        <source src='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' type='video/webm' />
        <source src='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' type='video/youtube' />
        <object data='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' width='100%'>
          <embed src='https://twgtea.com/Files/Images/TWG Tea Videos/[20200210] TWG Time for Tea (1220x670).mp4' width='100%' />
        </object>
      </video>
    </div>
  );
};

export default VideoBanner;
