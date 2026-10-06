import { randomBytes, createHash } from 'crypto';

export function generateApiClient(): string {
  // e.g. app_xxxxxxxxxxxxxxxxxxxxxxxx
  return `app_${randomBytes(16).toString('hex')}`;
}

export function generateApiSecret(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString('hex'); // show once to the user
  const hash = createHash('sha256').update(raw).digest('hex'); // store this
  return { raw, hash };
}
