'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';

type Movie = {
  id: number;
  title: string;
  releaseYear?: number | null;
  genre?: string | null;
  poster?: string | null;
  description?: string | null;
};

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // purkaa promisen

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', Number(id));

      if (error || !data || data.length === 0) setError('Elokuvaa ei löytynyt.');
      else setMovie(data[0]);
      setLoading(false);
    }
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="p-6">
      <Link href="/" className="mb-4 inline-block text-blue-500">Takaisin etusivulle</Link>
      <h1 className="text-2xl font-bold mb-2">{movie?.title}</h1>
      {movie?.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="mb-4 max-w-xs"
          style={{ borderRadius: '8px' }}
        />
      )}
      <p><strong>Julkaisuvuosi:</strong> {movie?.releaseYear}</p>
      <p><strong>Genre:</strong> {movie?.genre}</p>
      {movie?.description && (
        <p className="mt-2">{movie.description}</p>
      )}
    </main>
  );
}