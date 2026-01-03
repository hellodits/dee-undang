export interface TemplateConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  sections: {
    hero: boolean
    names: boolean
    datetime: boolean
    venue: boolean
    gallery: boolean
    story: boolean
    rsvp: boolean
    countdown: boolean
  }
  backgroundImage?: string
  musicUrl?: string
}

export const DEFAULT_TEMPLATES = [
  {
    id: 'classic-wedding',
    name: 'Classic Wedding',
    slug: 'classic-wedding',
    description: 'Timeless elegance for your special day',
    category: 'wedding',
    isPremium: false,
    thumbnail: '/templates/classic-wedding.jpg',
    config: {
      colors: {
        primary: '#8B7355',
        secondary: '#D4AF37',
        accent: '#F5F5DC',
        background: '#FFFFFF',
        text: '#333333',
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Lato',
      },
      sections: {
        hero: true,
        names: true,
        datetime: true,
        venue: true,
        gallery: true,
        story: true,
        rsvp: true,
        countdown: true,
      },
    },
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    slug: 'minimalist-modern',
    description: 'Clean and contemporary design',
    category: 'wedding',
    isPremium: false,
    thumbnail: '/templates/minimalist-modern.jpg',
    config: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#E5E5E5',
        background: '#FAFAFA',
        text: '#1A1A1A',
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter',
      },
      sections: {
        hero: true,
        names: true,
        datetime: true,
        venue: true,
        gallery: true,
        story: true,
        rsvp: true,
        countdown: true,
      },
    },
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    slug: 'elegant-luxury',
    description: 'Sophisticated gold and serif fonts',
    category: 'wedding',
    isPremium: true,
    thumbnail: '/templates/elegant-luxury.jpg',
    config: {
      colors: {
        primary: '#D4AF37',
        secondary: '#1A1A1A',
        accent: '#F8F8F8',
        background: '#FFFFFF',
        text: '#2C2C2C',
      },
      fonts: {
        heading: 'Cormorant Garamond',
        body: 'Crimson Text',
      },
      sections: {
        hero: true,
        names: true,
        datetime: true,
        venue: true,
        gallery: true,
        story: true,
        rsvp: true,
        countdown: true,
      },
    },
  },
  {
    id: 'pastel-cute',
    name: 'Pastel Cute',
    slug: 'pastel-cute',
    description: 'Soft and sweet pastel theme',
    category: 'wedding',
    isPremium: false,
    thumbnail: '/templates/pastel-cute.jpg',
    config: {
      colors: {
        primary: '#FFB6C1',
        secondary: '#E6E6FA',
        accent: '#FFF0F5',
        background: '#FFF5EE',
        text: '#4A4A4A',
      },
      fonts: {
        heading: 'Quicksand',
        body: 'Nunito',
      },
      sections: {
        hero: true,
        names: true,
        datetime: true,
        venue: true,
        gallery: true,
        story: true,
        rsvp: true,
        countdown: true,
      },
    },
  },
  {
    id: 'dark-modern',
    name: 'Dark Modern',
    slug: 'dark-modern',
    description: 'Bold and dramatic dark theme',
    category: 'wedding',
    isPremium: true,
    thumbnail: '/templates/dark-modern.jpg',
    config: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#C9A961',
        accent: '#2A2A2A',
        background: '#0A0A0A',
        text: '#FFFFFF',
      },
      fonts: {
        heading: 'Montserrat',
        body: 'Open Sans',
      },
      sections: {
        hero: true,
        names: true,
        datetime: true,
        venue: true,
        gallery: true,
        story: true,
        rsvp: true,
        countdown: true,
      },
    },
  },
]
