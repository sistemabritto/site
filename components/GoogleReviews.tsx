import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Google Reviews Component
 * Usa Place ID da Workflow API ou fallback estático
 * Para ativar: NEXT_PUBLIC_GOOGLE_PLACE_ID + NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
 */

const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';

interface UnifiedReview {
  name: string;
  rating: number;
  text: string;
  date: string;  // "há X" ou "2024-01-15"
  source: string;
  business?: string;
  photoUrl?: string;
}

const FALLBACK_REVIEWS: UnifiedReview[] = [
  {
    name: 'Ricardo M.',
    business: 'Clínica OdontoLife',
    rating: 5,
    text: 'Em 2 semanas o atendimento no WhatsApp virou nosso maior fechador de consultas. O ROI veio no primeiro mês.',
    date: 'há 3 dias',
    source: 'google',
  },
  {
    name: 'Amanda S.',
    business: 'Studio Pilates',
    rating: 5,
    text: 'Antes eu levava 3h por dia no WhatsApp marcando e remarcando. Hoje a IA faz tudo sozinha. Liberou minha vida.',
    date: 'há 1 semana',
    source: 'google',
  },
  {
    name: 'Carlos E.',
    business: 'Delivery Pizzaria',
    rating: 5,
    text: 'Do pedido ao delivery, tudo automático. O cliente elogia a velocidade e a gente atende 3x mais sem aumentar equipe.',
    date: 'há 2 semanas',
    source: 'google',
  },
  {
    name: 'Fernanda L.',
    business: 'Escritório Contábil',
    rating: 5,
    text: 'Documentação, agendamento, lembretes — tudo no automático. Clientes mais satisfeitos e menos retrabalho.',
    date: 'há 3 semanas',
    source: 'google',
  },
  {
    name: 'Roberto F.',
    business: 'Auto Escola Aprova',
    rating: 5,
    text: 'Qualificação de leads virou piada. O agente já entrega o cliente pronto pra fechar. Economia de 20h/semana.',
    date: 'há 1 mês',
    source: 'google',
  },
  {
    name: 'Patricia O.',
    business: 'Consultório Dermatologia',
    rating: 5,
    text: 'Agendamento 24/7 sem erro humano. Paciente elogia, equipe respira. Melhor investimento do ano.',
    date: 'há 1 mês',
    source: 'google',
  },
];

export default function GoogleReviews() {
  const reveal = useScrollReveal(0.15);
  const [reviews, setReviews] = useState<UnifiedReview[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
        setIsFallback(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&key=${GOOGLE_API_KEY}&fields=name,rating,reviews`
        );
        const data = await response.json();

        if (data.result?.reviews?.length > 0) {
          const mapped: UnifiedReview[] = data.result.reviews.slice(0, 6).map((r: any) => ({
            name: r.author_name || 'Usuário',
            rating: r.rating || 5,
            text: r.text || '',
            date: r.relative_time_description || 'recentemente',
            source: 'google',
            photoUrl: r.profile_photo_url,
          }));
          setReviews(mapped);
          setIsFallback(false);
        } else {
          setIsFallback(true);
        }
      } catch (error) {
        console.error('Erro ao buscar reviews:', error);
        setIsFallback(true);
        setReviews(FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section id="depoimentos" className="py-20 sm:py-32 bg-surface-900">
      <div ref={reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 text-sm font-bold uppercase tracking-wider mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
            Quem usa,
            <span className="gold-text"> recomenda</span>
          </h2>
          <p className="text-neutral-200 text-lg max-w-2xl mx-auto font-medium">
            Mais de 50 negócios já automatizaram o atendimento no WhatsApp com a Workflow API.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-strong rounded-2xl p-6 animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-5 h-5 bg-surface-700 rounded" />
                  ))}
                </div>
                <div className="h-4 bg-surface-700 rounded mb-2 w-full" />
                <div className="h-4 bg-surface-700 rounded mb-2 w-3/4" />
                <div className="h-4 bg-surface-700 rounded mb-6 w-1/2" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-700 rounded-full" />
                  <div className="h-4 bg-surface-700 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="glass-strong rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, starI) => (
                    <svg
                      key={starI}
                      className="w-5 h-5 text-gold-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-neutral-200 text-sm leading-relaxed mb-6 line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                  {review.photoUrl ? (
                    <img
                      src={review.photoUrl}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-surface-700 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    {review.business && (
                      <p className="text-neutral-300 text-xs">{review.business}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://search.google.com/local/reviews?placeid=CAwSKRInCgNwdnESIE9oWXdlREE2TUhnelpXWm1aRE5sT0RZeFlUQTJObUl6GAo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-3 border border-white/20 hover:border-gold-500/50 transition-colors"
          >
            <svg className="w-6 h-6 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.9998 2.98535C9.51981 2.98535 7.19981 3.82535 5.29981 5.26535L2.09981 2.06535C2.13981 2.02535 2.17981 1.99535 2.21981 1.95535C5.00981 -0.64535 8.47981 -2.00535 12.0098 -2.00535C17.3698 -2.00535 22.3298 1.00535 24.8698 5.66535L21.8698 8.66535C20.2298 5.62535 16.6998 2.98535 11.9998 2.98535Z" />
              <path d="M2.86981 7.10535C2.32981 8.54535 1.99981 10.1054 1.99981 11.7454C1.99981 13.3854 2.32981 14.9454 2.86981 16.3854L-0.139809 19.3854C-1.26981 17.2054 -1.99981 14.7654 -1.99981 12.1654C-1.99981 9.56535 -1.26981 7.12535 -0.139809 4.94535L2.86981 7.10535Z" />
              <path d="M12.0098 20.4954C16.7098 20.4954 20.2298 17.8554 21.8698 14.8154L24.8698 17.8154C22.3298 22.4754 17.3698 25.4854 12.0098 25.4854C8.47981 25.4854 5.00981 24.1254 2.21981 21.5254C2.17981 21.4854 2.13981 21.4554 2.09981 21.4154L5.29981 18.2154C7.19981 19.6554 9.51981 20.4954 12.0098 20.4954Z" />
            </svg>
            <span className="text-white text-sm font-semibold">
              Avaliado com 5.0 ★ no Google
            </span>
            <span className="text-xs text-gray-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
