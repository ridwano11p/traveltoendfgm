"use client";

import { BannerFormProps } from '../types';
import MediaInput from './MediaInput';

export default function BannerForm({
  state,
  dispatch,
  onCancel,
  onSubmit,
  isDark
}: BannerFormProps) {
  if (!state.editingBanner) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          value={state.editingBanner.title}
          onChange={(e) => dispatch({
            type: 'UPDATE_EDITING_BANNER',
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
          value={state.editingBanner.description}
          onChange={(e) => dispatch({
            type: 'UPDATE_EDITING_BANNER',
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

      <MediaInput
        isLocalMedia={state.isLocalMedia}
        onLocalMediaToggle={(isLocal) => dispatch({
          type: 'SET_IS_LOCAL_MEDIA',
          payload: isLocal
        })}
        onMediaFileChange={(file) => dispatch({
          type: 'SET_NEW_MEDIA_FILE',
          payload: file
        })}
        onYoutubeUrlChange={(url) => dispatch({
          type: 'SET_TEMP_YOUTUBE_URL',
          payload: url
        })}
        currentMedia={{
          url: state.editingBanner.mediaUrl,
          type: state.editingBanner.mediaType
        }}
        youtubeUrl={state.tempYoutubeUrl}
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
          Update Banner
        </button>
      </div>
    </form>
  );
}