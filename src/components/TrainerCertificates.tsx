import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Award, ShieldCheck } from 'lucide-react';

interface Cert {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
}

const TrainerCertificates = ({ trainerId }: { trainerId: string }) => {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('trainer_certificates')
        .select('id, image_url, title, sort_order')
        .eq('trainer_id', trainerId)
        .order('sort_order', { ascending: true });
      setCerts((data as Cert[]) || []);
      setLoading(false);
    })();
  }, [trainerId]);

  if (loading || certs.length === 0) return null;

  const blockEvents = {
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  return (
    <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Certifications & Awards</h3>
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Protected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certs.map((c) => (
            <div
              key={c.id}
              className="relative rounded-2xl overflow-hidden border border-border bg-muted/30 protected-cert"
              {...blockEvents}
            >
              {/* Background image (no <img>, prevents drag/save-as) */}
              <div
                role="img"
                aria-label={c.title || 'Trainer certificate'}
                className="w-full aspect-[4/3] bg-center bg-cover select-none"
                style={{ backgroundImage: `url(${c.image_url})` }}
                {...blockEvents}
              />
              {/* Diagonal repeating watermark */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-foreground/20 font-display font-bold text-2xl"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-30deg, transparent 0 80px, hsl(var(--background)/0.0) 80px 160px)',
                }}
                aria-hidden="true"
              >
                <span className="rotate-[-30deg] tracking-widest">GYMSPAYOGA.COM</span>
              </div>
              {/* Transparent shield blocks long-press save on touch */}
              <div
                className="absolute inset-0"
                style={{ background: 'transparent' }}
                {...blockEvents}
              />
              {c.title && (
                <div className="px-4 py-3 text-sm text-foreground bg-card border-t border-border">
                  {c.title}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Certificates are displayed for verification only. Downloading, copying, or screenshotting is not permitted.
        </p>
      </CardContent>
    </Card>
  );
};

export default TrainerCertificates;
