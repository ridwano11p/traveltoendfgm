export async function generateThumbnail(videoFile: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.load();
  
      video.onloadeddata = () => {
        video.currentTime = 1; // Capture frame at 1 second
      };
  
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' }));
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        }, 'image/jpeg', 0.95);
      };
  
      video.onerror = () => reject(new Error('Error loading video'));
    });
  }
  
  export function validateYouTubeUrl(url: string): boolean {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})$/;
    const match = url.match(regExp);
    return Boolean(match && match[1].length === 11);
  }
  
  export function extractYoutubeId(url: string): string | null {
    const match = url.match(/[a-zA-Z0-9_-]{11}/);
    return match ? match[0] : null;
  }
  