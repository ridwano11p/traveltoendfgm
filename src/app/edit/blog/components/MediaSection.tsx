"use client";

import { MediaSectionProps } from '../types';
import Image from 'next/image';

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function MediaSection({
  state,
  dispatch,
  isDark
}: MediaSectionProps) {
  return (
    <>
      <div>
        <label
          htmlFor="image"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Image
        </label>
        {state.editingBlog?.imageUrl && !state.removedImage && (
          <div className="mb-2">
            <div className="relative w-32 h-32">
              <Image
                src={state.editingBlog.imageUrl}
                alt="Current"
                fill
                className="object-cover rounded"
              />
            </div>
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
          onChange={(e) =>
            dispatch({
              type: 'SET_NEW_IMAGE',
              payload: e.target.files ? e.target.files[0] : null,
            })
          }
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className={`flex items-center mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <input
            type="checkbox"
            checked={state.isYouTubeVideo}
            onChange={(e) => {
              dispatch({
                type: 'SET_IS_YOUTUBE_VIDEO',
                payload: e.target.checked,
              });
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
                  dispatch({
                    type: 'SET_YOUTUBE_URL',
                    payload: e.target.value,
                  })
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
            {state.youTubeUrl && (
              <div className="mt-2">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(state.youTubeUrl)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        ) : (
          <div>
            {state.editingBlog?.videoUrl && !state.removedVideo && !state.isYouTubeVideo && (
              <div className="mb-2">
                <video src={state.editingBlog.videoUrl} className="w-64 rounded" controls />
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'SET_REMOVED_VIDEO', payload: true })
                  }
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
              onChange={(e) =>
                dispatch({
                  type: 'SET_NEW_VIDEO',
                  payload: e.target.files ? e.target.files[0] : null,
                })
              }
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
    </>
  );
}