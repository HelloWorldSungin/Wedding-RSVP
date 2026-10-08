# Wedding Site

An animated electronic wedding invitation and thank-you site for Sungin & Diane. The original envelope invitation remains at `/`; the wedding thank-you card has its own page at `/thank-you`.

## Pages

- `/` - original save-the-date invitation with the envelope animation and engagement photos.
- `/thank-you` - a breeze-block wall opens onto the first wedding photo, followed by the couple's note and three more photos. The page supports reduced motion and replay. Its social preview uses typography rather than a photo.
- `/tables` - guest table lookup.

The thank-you and table pages request `noindex` through their HTML metadata and Vercel response headers. The four thank-you photos are committed as optimized AVIF and WebP copies; the original JPEGs are not part of this site.

## Invitation Features

- **Envelope Opening Animation** - Realistic envelope that opens on tap/click with smooth 3D flap rotation
- **Card Reveal Animation** - Invitation card slides out and rotates 90 degrees into view
- **Engagement Photos** - Beautiful display of 3 engagement photos in elegant layout
- **Wedding Details** - Clear presentation of date, time, venue, and address
- **Action Buttons** - Quick access to RSVP form, wedding website, gift registry, and venue directions
- **Replay Animation** - Guests can replay the envelope animation to enjoy it again
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Performance Optimized** - Smooth 60fps animations, fast page load (<3s)

## Wedding Details

| | |
|---|---|
| **Couple** | Sungin & Diane |
| **Date** | Saturday, September 19, 2026 |
| **Time** | 4:00 PM PDT |
| **Venue** | Hart & Main |
| **Address** | 24217 Main St, Santa Clarita, CA 91321 |

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: Great Vibes, Playfair Display, and Lato; the thank-you page self-hosts its font files
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- A Node.js version supported by the installed Vite release
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wedding-e-invite.git
cd wedding-e-invite

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```bash
VITE_RSVP_URL=https://forms.google.com/your-form-id
VITE_WEDDING_WEBSITE_URL=https://your-wedding-website.com
VITE_REGISTRY_URL=https://your-registry-url.com
VITE_DIRECTIONS_URL=https://maps.google.com/?q=Hart+and+Main+24217+Main+St+Santa+Clarita+CA
```

## Project Structure

See [`vite.config.js`](vite.config.js) for the page entry points, and [`DESIGN.md`](DESIGN.md) for visual decisions.

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Claude Commands

This project includes Claude Code slash commands for development workflows.

### Planning & Execution
| Command | Description |
|---------|-------------|
| `/core_piv_loop:prime` | Load project context and codebase understanding |
| `/core_piv_loop:plan-feature` | Create comprehensive implementation plan with codebase analysis |
| `/core_piv_loop:execute` | Execute an implementation plan step-by-step |

### Validation
| Command | Description |
|---------|-------------|
| `/validation:validate` | Run full validation: tests, linting, coverage, build |
| `/validation:code-review` | Technical code review on changed files |
| `/validation:code-review-fix` | Fix issues found in code review |

### Misc
| Command | Description |
|---------|-------------|
| `/commit` | Create atomic commit with appropriate tag |
| `/create-prd` | Generate Product Requirements Document from conversation |

## Deployment

This project is configured for deployment on Vercel.

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the static files ready for deployment
```

### Vercel Configuration

See [`vercel.json`](vercel.json) for the route rewrites and `X-Robots-Tag` headers. The thank-you and table pages are available at extensionless paths.

## Design Reference

- **Inspiration**: [Paperless Post](https://www.paperlesspost.com)
- **Color Palette**: Cream (#FAF9F6), Beige (#F5F5DC), Charcoal (#36454F)
- **Typography**: Great Vibes (script), Playfair Display (serif), Lato (sans-serif)

## License

This is a personal project for Sungin & Diane's wedding. The repository is public.

---

Made with love for Sungin & Diane's wedding celebration.
