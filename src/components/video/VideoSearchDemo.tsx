import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { VideoSearchService } from '@/services/VideoSearchService';
import { Search, Play, Clock, User } from 'lucide-react';

interface VideoResult {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  description: string;
  relevantToLesson?: boolean;
}

export const VideoSearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      console.log('Searching for:', searchTerm);
      const videos = await VideoSearchService.searchVideos(searchTerm);
      setResults(videos);
      setSearchQuery(searchTerm);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetSearch = (lessonTitle: string) => {
    setSearchTerm(lessonTitle);
    setSearchQuery(lessonTitle);
    handleSearchWithTitle(lessonTitle);
  };

  const handleSearchWithTitle = async (title: string) => {
    setIsLoading(true);
    try {
      const videos = await VideoSearchService.searchVideos(title);
      setResults(videos);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const presetLessons = [
    "Fade bajo (low fade): paso a paso",
    "Corte con tijera en seco vs. mojado",
    "Afeitado con navaja: seguridad y ángulo",
    "Diseño de barba: líneas limpias",
    "Herramientas del barbero: tijeras, máquinas, peines, navajas"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Prueba de Búsqueda de Videos YouTube
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar videos de barbería..."
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {presetLessons.map((lesson, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePresetSearch(lesson)}
                className="text-xs"
              >
                {lesson}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {searchQuery && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Resultados para: <span className="font-medium">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary">
                    <Play className="w-4 h-4 mr-2" />
                    Ver Video
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    {video.channel}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
                {video.relevantToLesson && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mb-2">
                    ✓ Relevante para la lección
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.length === 0 && searchQuery && !isLoading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No se encontraron videos para "{searchQuery}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};