"use client";

import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FeatureStoryFormProps } from '../types';
import { validateYouTubeUrl, extractYoutubeId } from '../utils/youtubeHelpers';

export default function FeatureStoryForm({
  state,
  dispatch,
  onUpdate,
  onCancel,
  isDark,
}: FeatureStoryFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: 'SET_NEW_IMAGE', payload: file });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: 'SET_NEW_VIDEO', payload: file });
    }
  };

  const handleAddTag = () => {
    if (state.newTag.trim() && !state.tags.includes(state.newTag.trim())) {
      dispatch({ type: 'ADD_TAG', payload: state.newTag.trim() });
    }
  };

  return (
    <form onSubmit={onUpdate} className="space-y-6">
      {/* Title Input */}
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
          value={state.editingStory?.title || ''}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_EDITING_STORY',
              payload: { title: e.target.value },
            })
          }
          required
          minLength={3}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      {/* Content Input */}
      <div>
        <label
          htmlFor="content"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Content
        </label>
        <textarea
          id="content"
          value={state.editingStory?.content || ''}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_EDITING_STORY',
              payload: { content: e.target.value },
            })
          }
          required
          minLength={50}
          rows={10}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="image"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Image
        </label>
        {state.editingStory?.imageUrl && !state.removedImage && (
          <div className="mb-2">
            <Image
              src={state.editingStory.imageUrl}
              alt="Current"
              width={128}
              height={128}
              className="object-cover rounded"
            />
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_REMOVED_IMAGE', payload: true })}
              className={`mt-2 px-2 py-1 rounded ${
                isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white transition duration-300`}
            >
              Remove Image
            </button>
          </div>
        )}
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      {/* Video Section */}
      <div>
        <label className={`flex items-center mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <input
            type="checkbox"
            checked={state.isYouTubeVideo}
            onChange={(e) => {
              dispatch({ type: 'SET_IS_YOUTUBE_VIDEO', payload: e.target.checked });
              if (!e.target.checked) {
                dispatch({ type: 'SET_YOUTUBE_URL', payload: '' });
              }
            }}
            className="mr-2"
          />
          YouTube Video
        </label>

        {state.isYouTubeVideo ? (
          <div>
            <div className="flex mb-2">
              <input
                type="url"
                value={state.youTubeUrl}
                onChange={(e) =>
                  dispatch({ type: 'SET_YOUTUBE_URL', payload: e.target.value })
                }
                placeholder="Enter YouTube URL"
                className={`flex-grow px-3 py-2 border rounded-l-md ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_REMOVED_VIDEO', payload: true })}
                className={`px-4 py-2 rounded-r-md ${
                  isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                Remove
              </button>
            </div>
            {state.youTubeUrl && validateYouTubeUrl(state.youTubeUrl) && (
              <div className="mt-2">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(state.youTubeUrl)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {state.editingStory?.videoUrl && !state.removedVideo && !state.isYouTubeVideo && (
              <div className="mb-2">
                <video src={state.editingStory.videoUrl} className="w-64 rounded" controls />
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'SET_REMOVED_VIDEO', payload: true })}
                  className={`mt-2 px-2 py-1 rounded ${
                    isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                  } text-white transition duration-300`}
                >
                  Remove Video
                </button>
              </div>
            )}
            <input
              type="file"
              onChange={handleVideoChange}
              accept="video/*"
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div>
        <label
          htmlFor="tags"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Tags
        </label>
        <div className="flex flex-wrap mb-2">
          {state.tags.map((tag, index) => (
            <span
              key={index}
              className={`${
                isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
              } px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 flex items-center`}
            >
              {tag}
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_TAG', payload: tag })}
                className="ml-1 focus:outline-none"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={state.newTag}
            onChange={(e) =>
              dispatch({ type: 'SET_NEW_TAG', payload: e.target.value })
            }
            placeholder="Add a tag"
            className={`flex-grow px-3 py-2 border rounded-l-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className={`px-4 py-2 rounded-r-md ${
              isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Form Buttons */}
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
          Update Story
        </button>
      </div>
    </form>
  );
}