import { VideoSearchDemo } from '@/components/video/VideoSearchDemo';

const VideoTest = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Prueba de Búsqueda de Videos
        </h1>
        <VideoSearchDemo />
      </div>
    </div>
  );
};

export default VideoTest;