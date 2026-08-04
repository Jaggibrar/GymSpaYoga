/**
 * Client-side breached-password protection.
 *
 * Supabase's hosted "leaked password protection" setting is a dashboard toggle,
 * so this module enforces the same rule inside the app: every new or changed
 * password is checked against the Have I Been Pwned corpus using the k-anonymity
 * range API. Only the first 5 characters of the SHA-1 hash ever leave the browser —
 * the password itself is never transmitted.
 */

const HIBP_RANGE_URL = 'https://api.pwnedpasswords.com/range/';

async function sha1Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-1', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

export interface BreachCheckResult {
  breached: boolean;
  count: number;
  /** True when the lookup could not run (offline, blocked); callers should not hard-fail. */
  skipped: boolean;
}

export async function checkPasswordBreached(password: string): Promise<BreachCheckResult> {
  try {
    if (!crypto?.subtle) return { breached: false, count: 0, skipped: true };

    const hash = await sha1Hex(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const response = await fetch(`${HIBP_RANGE_URL}${prefix}`, {
      headers: { 'Add-Padding': 'true' },
    });

    if (!response.ok) return { breached: false, count: 0, skipped: true };

    const body = await response.text();
    for (const line of body.split('\n')) {
      const [lineSuffix, rawCount] = line.trim().split(':');
      if (lineSuffix === suffix) {
        const count = Number(rawCount) || 0;
        // Padded responses use a count of 0 for filler rows.
        if (count > 0) return { breached: true, count, skipped: false };
      }
    }

    return { breached: false, count: 0, skipped: false };
  } catch {
    return { breached: false, count: 0, skipped: true };
  }
}

/**
 * Returns an error message when the password must be rejected, otherwise null.
 * Combines complexity rules with the breach lookup.
 */
export async function validatePasswordSafety(password: string): Promise<string | null> {
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Password must contain at least one special character';

  const { breached, count } = await checkPasswordBreached(password);
  if (breached) {
    return `This password has appeared in ${count.toLocaleString()} known data breaches. Please choose a different one.`;
  }

  return null;
}
