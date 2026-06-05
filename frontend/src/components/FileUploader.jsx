import { useState } from 'react';

export default function FileUploader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    try {
      // 1) request presigned URL
      const resp = await fetch('http://localhost:4000/api/v1/uploads/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const body = await resp.json();
      if (!body.success) throw new Error(body.error?.message || 'presign failed');
      const { presignedUrl, key, url } = body.data;

      // 2) upload directly to S3 using PUT with progress
      setUploading(true);
      await uploadToPresigned(presignedUrl, file, (p) => setProgress(p));

      // 3) confirm to backend
      const conf = await fetch('http://localhost:4000/api/v1/uploads/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, filename: file.name, size: file.size, mimeType: file.type }),
      });
      const confBody = await conf.json();
      if (!confBody.success) throw new Error(confBody.error?.message || 'confirm failed');

      setUploading(false);
      setProgress(100);
      onComplete && onComplete(confBody.data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Upload failed');
      setUploading(false);
    }
  };

  function uploadToPresigned(url, file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) onProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error('Upload failed with status ' + xhr.status));
      };
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.send(file);
    });
  }

  return (
    <div>
      <label className="block mb-2">Upload file</label>
      <input type="file" onChange={handleFile} />
      {uploading && <div className="mt-2">Uploading: {progress}%</div>}
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}
