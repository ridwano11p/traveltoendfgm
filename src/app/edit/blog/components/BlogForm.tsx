"use client";

import { BlogFormProps } from '../types';
import MediaSection from './MediaSection';
import TagSection from './TagSection';

export default function BlogForm({
  blog,
  state,
  dispatch,
  onCancel,
  onSubmit,
  isDark,
}: BlogFormProps) {
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
          value={blog.title}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_EDITING_BLOG',
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

      <div>
        <label
          htmlFor="author"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          value={blog.author}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_EDITING_BLOG',
              payload: { author: e.target.value },
            })
          }
          required
          minLength={2}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Content
        </label>
        <textarea
          id="content"
          value={blog.content}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_EDITING_BLOG',
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

      <MediaSection state={state} dispatch={dispatch} isDark={isDark} />

      <TagSection
        tags={state.tags}
        newTag={state.newTag}
        onAddTag={() => {
          if (state.newTag.trim() && !state.tags.includes(state.newTag.trim())) {
            dispatch({ type: 'ADD_TAG', payload: state.newTag.trim() });
          }
        }}
        onRemoveTag={(tag) => dispatch({ type: 'REMOVE_TAG', payload: tag })}
        onNewTagChange={(value) =>
          dispatch({ type: 'SET_NEW_TAG', payload: value })
        }
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
          Update Blog
        </button>
      </div>
    </form>
  );
}