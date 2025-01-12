import { ThumbnailGenerationOptions, YouTubeValidation } from '../types';

export function validateYouTubeUrl(url: string): YouTubeValidation {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})$/;
  const match = url.match(regExp);
  const isValid = Boolean(match && match[1].length === 11);
  const videoId = isValid ? match![1] : null;

  return { isValid, videoId };
}

export function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export async function generateThumbnail(
  videoFile: File,
  options: ThumbnailGenerationOptions = {}
): Promise<File> {
  const {
    captureTime = 1,
    quality = 0.95,
    type = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    video.load();

    video.onloadeddata = () => {
      video.currentTime = captureTime;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], 'thumbnail.jpg', { type }));
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        },
        type,
        quality
      );
    };

    video.onerror = () => reject(new Error('Error loading video'));
  });
}

export async function cleanupStorageFiles(
  videoUrl: string | null,
  thumbnailUrl: string | null,
  storage: any
): Promise<void> {
  const deletePromises: Promise<void>[] = [];

  if (videoUrl) {
    const videoRef = storage.ref(videoUrl);
    deletePromises.push(videoRef.delete());
  }

  if (thumbnailUrl) {
    const thumbnailRef = storage.ref(thumbnailUrl);
    deletePromises.push(thumbnailRef.delete());
  }

  await Promise.all(deletePromises);
}

export function getVideoDisplayDetails(video: {
  isYouTube: boolean;
  youtubeId?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  title: string;
}) {
  const thumbnailUrl = video.isYouTube
    ? `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`
    : (video.thumbnailUrl || video.videoUrl);

  return {
    thumbnailUrl,
    isYouTube: video.isYouTube,
    title: video.title
  };
}
