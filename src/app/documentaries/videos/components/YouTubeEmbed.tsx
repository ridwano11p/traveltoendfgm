export default function YouTubeEmbed({ videoId }: { videoId: string }) {
    return (
      <div className="w-full h-0 pb-[56.25%] relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }
  