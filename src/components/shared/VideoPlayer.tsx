"use client";

interface VideoPlayerProps {
  videoUrl: string;
  isYouTubeVideo: boolean;
}

const VideoPlayer = ({ videoUrl, isYouTubeVideo }: VideoPlayerProps) => {
  if (isYouTubeVideo) {
    let videoId = videoUrl.split('v=')[1];
    const ampersandPosition = videoId?.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return (
      <div className="w-full h-full relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <video controls className="w-full h-full">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;