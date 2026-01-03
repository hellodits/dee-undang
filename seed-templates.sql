-- Insert Templates ke Database
-- Copy-paste script ini ke Supabase SQL Editor dan Run

-- Insert 5 templates
INSERT INTO "Template" (id, name, slug, description, category, "isPremium", thumbnail, config, "createdAt", "updatedAt")
VALUES 
(
  'clx1-classic-wedding',
  'Classic Wedding',
  'classic-wedding',
  'Timeless elegance for your special day',
  'wedding',
  false,
  '/templates/classic-wedding.jpg',
  '{"colors":{"primary":"#8B7355","secondary":"#D4AF37","accent":"#F5F5DC","background":"#FFFFFF","text":"#333333"},"fonts":{"heading":"Playfair Display","body":"Lato"},"sections":{"hero":true,"names":true,"datetime":true,"venue":true,"gallery":true,"story":true,"rsvp":true,"countdown":true}}'::jsonb,
  NOW(),
  NOW()
),
(
  'clx2-minimalist-modern',
  'Minimalist Modern',
  'minimalist-modern',
  'Clean and contemporary design',
  'wedding',
  false,
  '/templates/minimalist-modern.jpg',
  '{"colors":{"primary":"#000000","secondary":"#FFFFFF","accent":"#E5E5E5","background":"#FAFAFA","text":"#1A1A1A"},"fonts":{"heading":"Inter","body":"Inter"},"sections":{"hero":true,"names":true,"datetime":true,"venue":true,"gallery":true,"story":true,"rsvp":true,"countdown":true}}'::jsonb,
  NOW(),
  NOW()
),
(
  'clx3-elegant-luxury',
  'Elegant Luxury',
  'elegant-luxury',
  'Sophisticated gold and serif fonts',
  'wedding',
  true,
  '/templates/elegant-luxury.jpg',
  '{"colors":{"primary":"#D4AF37","secondary":"#1A1A1A","accent":"#F8F8F8","background":"#FFFFFF","text":"#2C2C2C"},"fonts":{"heading":"Cormorant Garamond","body":"Crimson Text"},"sections":{"hero":true,"names":true,"datetime":true,"venue":true,"gallery":true,"story":true,"rsvp":true,"countdown":true}}'::jsonb,
  NOW(),
  NOW()
),
(
  'clx4-pastel-cute',
  'Pastel Cute',
  'pastel-cute',
  'Soft and sweet pastel theme',
  'wedding',
  false,
  '/templates/pastel-cute.jpg',
  '{"colors":{"primary":"#FFB6C1","secondary":"#E6E6FA","accent":"#FFF0F5","background":"#FFF5EE","text":"#4A4A4A"},"fonts":{"heading":"Quicksand","body":"Nunito"},"sections":{"hero":true,"names":true,"datetime":true,"venue":true,"gallery":true,"story":true,"rsvp":true,"countdown":true}}'::jsonb,
  NOW(),
  NOW()
),
(
  'clx5-dark-modern',
  'Dark Modern',
  'dark-modern',
  'Bold and dramatic dark theme',
  'wedding',
  true,
  '/templates/dark-modern.jpg',
  '{"colors":{"primary":"#1E1E1E","secondary":"#C9A961","accent":"#2A2A2A","background":"#0A0A0A","text":"#FFFFFF"},"fonts":{"heading":"Montserrat","body":"Open Sans"},"sections":{"hero":true,"names":true,"datetime":true,"venue":true,"gallery":true,"story":true,"rsvp":true,"countdown":true}}'::jsonb,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Verify
SELECT id, name, slug, "isPremium", category FROM "Template" ORDER BY name;
