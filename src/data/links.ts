/**
 * Contact / Links.
 *
 * Fill in each `url`. Leave a link's `url` as '' to auto-hide it until ready.
 * `primary: true` promotes a link to a big highlighted action in the contact view.
 */
export interface SocialLink {
  label: string
  icon: 'github' | 'discord' | 'tebex' | 'email' | 'docs' | 'link' | 'message'
  /** Set to '' to hide until configured. */
  url: string
  handle?: string
  primary?: boolean
}

export const links: SocialLink[] = [
  {
    label: 'Discord Server',
    icon: 'discord',
    url: 'https://discord.gg/9b6AmVGqAf',
    handle: 'Join the store community',
    primary: true,
  },
  {
    label: 'Direct Message',
    icon: 'message',
    url: 'https://discord.com/users/433085624870764555',
    handle: 'DM @xenzhe on Discord',
    primary: true,
  },
  {
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/taelabs',
    handle: '@taelabs',
  },
  {
    label: 'Tebex / Store',
    icon: 'tebex',
    url: 'https://taelabs.tebex.io/',
    handle: 'Browse resources',
  },
  {
    label: 'Email',
    icon: 'email',
    url: 'mailto:taelabsproject@gmail.com',
    handle: 'taelabsproject@gmail.com',
  },
]

/** Links used by hero / nav call-to-actions. */
export const primaryLinks = {
  github: 'https://github.com/taelabs',
  discord: 'https://discord.gg/9b6AmVGqAf',
  tebex: 'https://taelabs.tebex.io/',
  email: 'mailto:taelabsproject@gmail.com',
  contact: 'contact',
  work: 'work',
} as const
