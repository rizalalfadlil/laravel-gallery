import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';

export default function UploadForm() {
  const [album, setalbum] = useState('')
  const [file, setfile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('album', album);
    formData.append('image', file);

    axios.post('/upload', formData)
      .then(response => {
        // Handle success
        console.log(response.data);
        window.location.reload()
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid'>
        <label>Album</label>
        <TextInput
          type="text"
          name="album"
          value={album}
          onChange={(e) => setalbum(e.target.value)}
          required
        />
      </div>
      <div className='grid'>
        <label>File</label>
        <input
        className='p-2 bg-slate-100 rounded-md'
          type="file"
          name="file"
          onChange={(e) => setfile(e.target.files[0])}
          required
        />
      </div>
      <PrimaryButton type="submit">Upload</PrimaryButton>
    </form>
  );
}
