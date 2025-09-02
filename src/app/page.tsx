'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

type Movie = {
  id: number;
  title: string;
  releaseYear?: number | null;
  genre?: string | null;
};

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('id, title, releaseYear, genre')
        .order('id', { ascending: true })
        .limit(40);

      if (error) setError('Virhe haettaessa elokuvia.');
      else setMovies(data || []);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Xamkflix Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className="mb-4 border rounded p-4">
            <Link href={`/movie/${movie.id}`}>
              <span className="font-bold text-lg">{movie.title}</span>
            </Link>
            <div>{movie.releaseYear}</div>
            <div className="text-gray-400">{movie.genre}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
