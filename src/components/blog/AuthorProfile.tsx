import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Globe, Instagram, Linkedin, Twitter } from 'lucide-react';

interface AuthorProfileProps {
  name?: string;
  avatarUrl?: string;
  bio?: string;
  socials?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const DEFAULT_BIO =
  'The GymSpaYoga editorial team curates trusted, expert-reviewed wellness content across fitness, yoga, spa, and holistic health — helping India discover better ways to move, breathe, and recover.';

const DEFAULT_SOCIALS = {
  website: 'https://gymspayoga.com',
  twitter: 'https://twitter.com/gymspayoga',
  instagram: 'https://instagram.com/gymspayoga',
  linkedin: 'https://www.linkedin.com/company/gymspayoga',
};

const AuthorProfile = ({
  name = 'GymSpaYoga Editorial',
  avatarUrl,
  bio,
  socials,
}: AuthorProfileProps) => {
  const links = { ...DEFAULT_SOCIALS, ...(socials || {}) };
  const finalBio = bio || DEFAULT_BIO;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const socialLinks: Array<{ key: string; href?: string; label: string; icon: React.ReactNode }> = [
    { key: 'website', href: links.website, label: 'Website', icon: <Globe className="h-4 w-4" /> },
    { key: 'twitter', href: links.twitter, label: 'Twitter / X', icon: <Twitter className="h-4 w-4" /> },
    { key: 'instagram', href: links.instagram, label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
    { key: 'linkedin', href: links.linkedin, label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  ];

  return (
    <section
      aria-label="About the author"
      className="mt-10 rounded-3xl bg-card border border-border shadow-medium p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <Avatar className="h-20 w-20 border-2 border-primary/40 shadow-emerald">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-gradient-emerald text-primary-foreground font-bold text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
            Written by
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            {finalBio}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks
              .filter((s) => s.href)
              .map((s) => (
                <Button
                  key={s.key}
                  asChild
                  variant="outline"
                  size="sm"
                  aria-label={s.label}
                  className="h-9 w-9 p-0 border-border hover:border-primary/60 hover:text-primary hover:bg-primary/10"
                >
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                </Button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorProfile;
