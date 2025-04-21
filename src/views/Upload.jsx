import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/ApiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const { user } = useUserContext();
  const navigate = useNavigate();
  
  const initValues = { title: '', description: '' };
  const { inputs, handleInputChange, handleSubmit } = useForm(async () => {
    try {
      const token = localStorage.getItem('token');
      const fileData = await postFile(file, token);
      const mediaData = {
        title: inputs.title,
        description: inputs.description,
        filename: fileData.filename,
      };
      await postMedia(mediaData, token);
      navigate('/');
    } catch (e) {
      console.log(e.message);
      alert('Upload failed');
    }
  }, initValues);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            value={inputs.title}
            onChange={handleInputChange}
            minLength="3"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            onChange={handleFileChange}
            accept="image/*, video/*"
          />
        </div>
        <img
          src={file ? URL.createObjectURL(file) : 'https://via.placeholder.com/200'}
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={!file || inputs.title.length < 3 || !user}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
