# Lovas Energy Services Website

This repository contains the Next.js website for Lovas Energy Services.

## Deployment Pipeline

This README documents the process for building and deploying the Lovas Energy Services website to Netlify with proper routing and asset handling.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git
- GitHub account
- Netlify account

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build Process

To build the website for production:

```bash
# Generate static export
npm run build
```

### Styling Customizations

#### Form Text Color

To adjust form input text color, modify the input and textarea classes in `src/app/page.tsx`. For black text:

```tsx
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
```

#### Other Common Styling Changes

- **Button colors**: Modify the `btn-primary` class in `src/app/globals.css`
- **Heading colors**: Change the `text-blue-900` class to another color in heading elements
- **Background colors**: Update the background classes (e.g., `bg-blue-900`, `bg-gray-50`) throughout the components

### Deployment Strategy

The site uses a static export of Next.js deployed to Netlify with custom configuration for proper routing and content types.

#### Key Configuration Files

1. `netlify.toml` - Controls routing and caching:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
  conditions = {Path = {match = "!/_next/*"}}
  conditions = {Path = {match = "!/static/*"}}
  conditions = {Path = {match = "!/*.js"}}
  conditions = {Path = {match = "!/*.css"}}
  conditions = {Path = {match = "!/*.woff2"}}

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Content-Type = "text/css"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

2. `public/_headers` - Ensures correct content types:
```
/static/chunks/*.js
  Content-Type: application/javascript

/*.js
  Content-Type: application/javascript

/_next/static/chunks/*.js
  Content-Type: application/javascript
  
/static/css/*.css
  Content-Type: text/css

/*.css
  Content-Type: text/css
  
/static/media/*
  Cache-Control: public, max-age=31536000, immutable
```

3. `public/_redirects` - Fallback for client-side routing:
```
/* /index.html 200

# Fix for _next path references
/_next/static/chunks/:file /static/chunks/:file 200
/_next/static/css/:file /static/css/:file 200
/_next/static/media/:file /static/media/:file 200
/_next/* /static/:splat 200
```

### Deployment Steps

1. **Build the static site**:
   ```bash
   npm run build
   ```

2. **Prepare the static output**:
   ```bash
   # Create and populate the out directory
   rm -rf out
   mkdir -p out
   cp -r .next/static out/
   cp -r public/* out/
   cp -a .next/server/app/. out/app/
   cp .next/server/app/index.html out/
   touch out/.nojekyll
   ```

3. **Create _next directory structure** (CRITICAL):
   ```bash
   # This step is crucial to prevent JavaScript loading errors
   cd out
   mkdir -p _next/static
   cp -r static/* _next/static/
   ```

4. **Initialize Git in the output directory**:
   ```bash
   cd out
   git init
   git add .
   git commit -m "Deploy static site"
   ```

5. **Connect to GitHub repository**:
   ```bash
   git remote add origin https://github.com/MikeRa1979/lovas-energy-site.git
   git push -f origin master
   ```

6. **Connect Netlify to the GitHub repository**:
   - In Netlify dashboard, select "New site from Git"
   - Choose GitHub and select your repository
   - Set build command to `# no build needed`
   - Set publish directory to `/`
   - Deploy the site

7. **Set up custom domain in Netlify**:
   - Go to Site settings > Domain management
   - Add custom domain: lovasenergy.com
   - Update DNS records at your domain registrar

### Troubleshooting

If you encounter JavaScript loading issues with "Unexpected token '<'" errors:

1. Make sure the `_next` directory structure exists and contains copies of all static files
2. Verify the `_headers` file is correctly set up in your repository
3. Check that `netlify.toml` is properly configured
4. Make sure all configuration files are in the root of your deployed site
5. Trigger a new deployment in Netlify

### DNS Configuration

To point your GoDaddy domain to Netlify:

1. In GoDaddy DNS settings:
   - Remove any A records pointing to GoDaddy servers
   - Add custom nameservers provided by Netlify, or
   - Add CNAME record pointing to your Netlify subdomain

2. Verify DNS propagation:
   ```bash
   dig lovasenergy.com
   ```

### Maintenance

For future updates:

1. Make changes in the main repository
2. Rebuild with `npm run build` 
3. Follow the deployment steps above to update the site
