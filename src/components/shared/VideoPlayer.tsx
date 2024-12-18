"use client";

interface VideoPlayerProps {
  videoUrl: string;
  isYouTubeVideo: boolean;
}

export default function VideoPlayer({ videoUrl, isYouTubeVideo }: VideoPlayerProps) {
  if (isYouTubeVideo) {
    // Extract video ID from YouTube URL
    let videoId = videoUrl.split("v=")[1];
    const ampersandPosition = videoId?.indexOf("&");
    
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    if (!videoId) {
      console.error("Invalid YouTube URL");
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Invalid video URL</p>
        </div>
      );
    }

    return (
      <div className="w-full h-full relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <video 
        controls 
        className="w-full h-full rounded-lg"
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        <track 
          kind="captions"
          src=""
          label="English"
          srcLang="en"
          default
        />
        <p className="text-gray-500 dark:text-gray-400">
          Your browser does not support the video tag.
        </p>
      </video>
    </div>
  );
}