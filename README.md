# Consumer Goods Intelligence website

The marketing website for **Consumer Goods Intelligence (CGI)**, built with React, Vite and React Router.

## 1. What you need first

Install **Node.js** (version 20 or newer) from https://nodejs.org. This also installs `npm`.

## 2. Install and run

Open a terminal in this `cgi-website` folder and run:

```bash
npm install
```

This downloads everything the project needs. You only do it once (or again after someone adds a package).

```bash
npm run dev
```

This starts the website on your computer. Open the address it prints (usually http://localhost:5173). When you save a file, the page updates by itself. Press `Ctrl + C` in the terminal to stop it.

## 3. Build for the real website

```bash
npm run build
```

This creates a `dist` folder with the finished website. Upload the contents of `dist` to your hosting (for example Netlify, Vercel or Cloudflare Pages).

Important: because the site has several pages, your host must send every address to `index.html`. On Netlify, add a file `public/_redirects` containing `/* /index.html 200`. Vercel and Cloudflare Pages usually handle this for Vite apps automatically.

To check the built version locally:

```bash
npm run preview
```

## 4. Where things live

```
src/
  data/content.js        ← ALL the text and links on the website
  index.css              ← ALL the styles (colours, fonts, layout) in one file
  components/            ← reusable pieces (Navbar, Footer, buttons, cookie popups...)
  pages/                 ← one file per page
  App.jsx                ← the list of pages and the cookie logic
public/                  ← images (logos) and the favicon
```

All styles are in `src/index.css`, split into numbered sections (Navbar, Footer, Home page...). The list of sections is at the top of the file. Keep the GLOBAL section last: when two rules clash, the lower one wins.

## 5. How to change text

Open `src/data/content.js`. Every heading, paragraph and button label is there, grouped by page (`home`, `shift`, `whatWeDo`, `focusAreas`, `contact`, `legal`...). Change the words between the quotes and save.

Example: to change the home page heading, edit `home.hero.title`.

The Terms and Privacy pages contain **placeholder text**. Replace it in `legal.terms` and `legal.privacy` before launch, and update `lastUpdated`.

## 6. How to change colours and fonts

Open `src/index.css` and go to section 1 (VARIABLES). The brand colours are at the top, for example:

```css
--cgi-blue: #234F94;
--cgi-orange: #D25B31;
```

Change a value once and it updates across the whole site. Please do not type colour codes anywhere else.

Fonts are loaded from Google Fonts in `index.html` and named in section 1 of `index.css` (`--font-heading`, `--font-body`).

## 7. Where to put the LinkedIn link

Open `src/data/content.js` and find:

```js
linkedinUrl: "#", // TODO: paste your LinkedIn page link here
```

Replace `#` with your page address, e.g. `"https://www.linkedin.com/company/your-page"`. Every LinkedIn button and link on the site uses this one value.

## 8. How to change the logos

Replace `public/logo-full-colour.png` (blue logo, for light backgrounds) and `public/logo-reversed.png` (white logo, for the dark footer). Keep the same file names.

## 8b. The home page video

The globe video behind the home page heading is set in `content.js` (`home.hero.videoUrl` and `posterUrl`). It is currently hosted by someone else; put your own `.mp4` in `public/` and change the address to e.g. `"/hero.mp4"`. The colour shift toward CGI blue is the `filter` line in the HOME HERO section of `src/index.css`.

The heading's line breaks come from `home.hero.titleLines`. The short "slide in" animation when the site loads is explained at the top of `index.html` and in the GLOBAL section of `src/index.css`.

## 8c. Glass effects on the live site

Always write the blur as two lines in this order:

```css
-webkit-backdrop-filter: blur(16px);
backdrop-filter: blur(16px);
```

If the plain `backdrop-filter` comes first, `npm run build` removes it and the glass looks solid on the deployed site, even though it looks fine in `npm run dev`.

## 9. How to add a new page

1. Create `src/pages/AboutPage.jsx` by copying a simple page such as `ShiftPage.jsx`, and rename the function to `AboutPage`.
2. Add its text to `src/data/content.js` (e.g. `export const about = { ... }`) and import it in the page.
3. Open `src/App.jsx`, import the page at the top:
   ```js
   import AboutPage from "./pages/AboutPage.jsx";
   ```
   and add a route inside `<Routes>`:
   ```jsx
   <Route path="/about" element={<AboutPage />} />
   ```
4. To show it in the navbar and footer, add `{ label: "About", to: "/about" }` to `navLinks` in `content.js`.

Remember to alternate section backgrounds down the page: `section-white`, then `section-ice`, then `section-white`, and so on.

## 10. The contact form

The form checks the fields and shows a thank-you message, but **does not send email yet**. In `src/components/ContactForm.jsx`, look for the `TODO` comment in `handleSubmit`. That is where a service like EmailJS or Formspree can be connected.

## 11. Cookies

The visitor's choice is saved in the browser under `cgi-cookie-consent`. The logic is in `src/App.jsx`. There is a comment in `saveConsent` showing where analytics scripts should be loaded, only if the visitor allowed analytics. No tracking is included.
