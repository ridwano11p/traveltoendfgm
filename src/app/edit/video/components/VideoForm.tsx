"use client";

import { VideoFormProps } from '../types';
import { FaTrash } from 'react-icons/fa';
import VideoTypeToggle from './VideoTypeToggle';
import MediaInputs from './MediaInputs';

export default function VideoForm({
  video,
  isLocalVideo,
  tempYoutubeUrl,
  newVideoFile,
  newThumbnail,
  isDark,
  onUpdate,
  onCancel,
  onRemoveVideo,
  dispatch,
}: VideoFormProps) {
  return (
    <form onSubmit={onUpdate} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={video.title}
          onChange={(e) => dispatch({
            type: 'UPDATE_EDITING_VIDEO',
            payload: { title: e.target.value }
          })}
          required
          minLength={3}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Description
        </label>
        <textarea
          id="description"
          value={video.description}
          onChange={(e) => dispatch({
            type: 'UPDATE_EDITING_VIDEO',
            payload: { description: e.target.value }
          })}
          required
          minLength={10}
          rows={5}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <VideoTypeToggle
        isLocalVideo={isLocalVideo}
        onChange={(isLocal) => dispatch({ type: 'SET_IS_LOCAL_VIDEO', payload: isLocal })}
        isDark={isDark}
      />

      <MediaInputs
        isLocalVideo={isLocalVideo}
        tempYoutubeUrl={tempYoutubeUrl}
        onVideoChange={(file) => dispatch({ type: 'SET_NEW_VIDEO_FILE', payload: file })}
        onThumbnailChange={(file) => dispatch({ type: 'SET_NEW_THUMBNAIL', payload: file })}
        onYoutubeUrlChange={(url) => dispatch({ type: 'SET_TEMP_YOUTUBE_URL', payload: url })}
        isDark={isDark}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
          } text-gray-800 transition duration-300`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition duration-300`}
        >
          Update Video
        </button>
        {((isLocalVideo && newVideoFile) || (!isLocalVideo && tempYoutubeUrl)) && (
          <button
            type="button"
            onClick={onRemoveVideo}
            className={`px-4 py-2 rounded-md ${
              isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            } text-white transition duration-300 flex items-center`}
          >
            <FaTrash className="mr-2" /> Remove New Video
          </button>
        )}
      </div>
    </form>
  );
}
