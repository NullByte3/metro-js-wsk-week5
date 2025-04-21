import React from 'react';
import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/ApiHooks';

const Home = () => {
  const { mediaArray } = useMedia();

  return (
    <>
      <h2>Media Files</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
