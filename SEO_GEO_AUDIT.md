# Site-Wide Technical SEO and GEO Readiness Audit

Audit date: 2026-10-20  
Scope: repository inspection only. No live crawl, DNS, redirects, Lighthouse run, Search Console, analytics account, or production-server configuration was available for verification.

## 1. Executive summary

The site has a solid foundation on the recently optimized core service pages: `index.html`, `about.html`, `buy.html`, `sell.html`, `invest.html`, `services.html`, `contact.html`, and `listings.html` have one H1, a viewport tag, a canonical URL, an HTML meta description, and Open Graph title/description/type/URL metadata. Nick's displayed name, DRE number (`02208540`), phone, and email are consistently represented in the current core-page templates.

However, the site is not ready for reliable index management or consistent local/GEO discovery. There is no `robots.txt`, no XML sitemap, no schema markup, and the blog/reviews sections have not received the same technical pass. Most urgently, three obsolete "For Sale" listings and prices are still publicly rendered on the homepage even though the Listings page has been intentionally paused. The article pages have duplicate titles and descriptions, lack canonical/OG tags, and include time-sensitive market claims without visible source links.

The first safe batch should be: remove or pause the homepage featured-listing section using the same feature-flag approach as `listings.html`; correct blog metadata and article identity; and add `robots.txt` plus a canonical-only sitemap after production URLs/redirects are confirmed.

## 2. Critical issues

### C-01 — Obsolete listing data is still publicly rendered on the homepage

- **Affected files:** `index.html:99-179`; `script.js:730-1018`
- **Evidence:** The homepage renders three "Featured Listings" cards for 1629 Centre Ct ($549,900), 44237 Danya Ln ($460,000), and 2614 Joshua Hills Drive ($519,999), each marked "For Sale." The JavaScript listing records remain present as well. This conflicts with the Listings page's current `No Current Listings` state.
- **Why it matters:** Search engines, users, and AI answer systems can surface stale property availability, pricing, and status. It also creates a material trust/compliance issue during the brokerage transition.
- **Recommended fix:** Apply the Listings page feature-flag/empty-state pattern to the homepage featured-listings section. Keep stale cards and data in an inert template or separate inactive data file, remove them from the live rendered DOM, and point the section to the neutral listings/contact experience until new listings are approved.
- **Priority:** Critical
- **Manual confirmation:** Yes — confirm each historic property is no longer authorized for public marketing before hiding it, then visually test the homepage.

### C-02 — Crawl directives and sitemap are absent

- **Affected files:** repository root; `CNAME:1`
- **Evidence:** No `robots.txt` or `sitemap.xml` is present in the repository. No robots meta directives were found in the HTML pages.
- **Why it matters:** Search engines have no repository-managed sitemap to discover canonical public URLs, and there is no declared crawler policy. The canonical home is `https://agentarmijo.com/`, while local files and links also expose `index.html` paths.
- **Recommended fix:** Add a minimal `robots.txt` that permits public pages and references the production sitemap. Add a manually maintained `sitemap.xml` containing only canonical public pages: `/`, `/about.html`, `/buy.html`, `/sell.html`, `/invest.html`, `/services.html`, `/listings.html`, `/contact.html`, `/reviews.html` only after its claims are approved, `/blog.html`, and each approved article URL. Do not include `/index.html`, inactive listing records, APIs, or unfinished pages. Confirm hosting serves both files with `200` and correct content type.
- **Priority:** Critical
- **Manual confirmation:** Yes — verify redirects, host behavior, and submit the sitemap in Search Console/Bing Webmaster Tools.

### C-03 — Four blog articles have duplicate, inaccurate identity metadata

- **Affected files:** `blog/good-time-to-buy-antelope-valley.html:7-9`; `blog/palmdale-home-prices.html:7-9`; `blog/palmdale-vs-lancaster.html:7-9`; `blog/best-neighborhoods-antelope-valley.html:7-9`
- **Evidence:** All four articles use the same generic meta description and the same title, `Is Now a Good Time to Buy in Antelope Valley? | 2026`. Three titles do not match their visible H1/content; for example, the neighborhood article's H1 is "What Are the Best Neighborhoods in Palmdale for Home Buyers?" at line 47.
- **Why it matters:** Duplicate and mismatched metadata weakens topical relevance, creates duplicate-content ambiguity, and makes search/social snippets misleading.
- **Recommended fix:** Give every article a title and description matching its visible H1 and specific search intent. Add a self-referencing canonical and complete OG metadata to each. Retain only articles whose data, citations, and publication details can be verified.
- **Priority:** Critical
- **Manual confirmation:** Yes — editorial review and source verification are required before publishing claims.

## 3. High-priority issues

### H-01 — Blog articles lack canonical URLs, Open Graph tags, and structured article identity

- **Affected files:** `blog.html:4-20`; all `blog/*.html:4-20`
- **Evidence:** `blog.html` has a description but no canonical or Open Graph metadata. The four article head blocks likewise have no canonical, OG, `Article`/`BlogPosting` JSON-LD, or visible "last updated" date.
- **Why it matters:** Crawlers and social platforms cannot reliably associate each article with its canonical production URL, author, image, and publishing information. This also limits attribution clarity for AI retrieval systems.
- **Recommended fix:** Add unique canonical and OG tags per page. Once the article copy and dates are confirmed, add `BlogPosting` JSON-LD matching visible headline, author, date published/modified, canonical URL, and image. Do not add ratings, publisher claims, or dates that cannot be substantiated.
- **Priority:** High
- **Manual confirmation:** Yes — confirm publication and modification dates and the public absolute image URL.

### H-02 — Time-sensitive local market statements are not supported by linked sources

- **Affected files:** `blog/good-time-to-buy-antelope-valley.html:68-120`; `blog/palmdale-home-prices.html:71-196`; `blog/palmdale-vs-lancaster.html:83-196`; `blog/best-neighborhoods-antelope-valley.html:90-171`
- **Evidence:** The articles state June 2026 values, price differences, inventory counts, days-to-pending, and neighborhood median prices while naming Zillow, Realtor.com, or Redfin in prose. No visible external source links, methodology, or updated date was found.
- **Why it matters:** Market figures age quickly. Unsupported or stale data reduces trust, risks misleading users, and weakens factual reliability signals for both search and AI systems.
- **Recommended fix:** Either link each material statistic to its primary/source page and record a visible "data as of" / "last updated" date, or remove/replace the statistic with durable, non-numeric guidance. Establish a recurring editorial review cadence for market-content pages.
- **Priority:** High
- **Manual confirmation:** Yes — source and date verification is essential.

### H-03 — Reviews page contains unverified quantitative and testimonial claims

- **Affected file:** `reviews.html:141-179` (also `reviews.html:57-82`)
- **Evidence:** The page claims `50+ Happy Clients`, `5.0 Average Rating`, `$4M+ In Sales Closed`, plus named/unnamed review material and "Years of experience." No source, review platform link, date, or confirmation data is in the repository.
- **Why it matters:** These are public marketing claims and should not be published or marked up as reviews unless verifiable. Incorrect review/production claims can create compliance and credibility risks.
- **Recommended fix:** Obtain written confirmation and a source for each metric/review, or remove the unsupported quantitative claims. If authentic reviews are retained, link to their source where permitted. Do not deploy `Review`/`AggregateRating` schema until it exactly reflects eligible, independently sourced visible reviews.
- **Priority:** High
- **Manual confirmation:** Yes — required.

### H-04 — Stale listing data remains globally shipped in JavaScript

- **Affected file:** `script.js:720-1018`
- **Evidence:** `listingsEnabled = false` correctly keeps the paused Listings-page template from being activated, but `listingData` still contains old addresses, prices, statuses, descriptions, and gallery paths in the site-wide script loaded by every page.
- **Why it matters:** The records are not currently rendered on `listings.html`, but are publicly downloadable and can accidentally be reintroduced by future JavaScript changes. Shipping listing data to unrelated pages also adds unnecessary payload.
- **Recommended fix:** Preserve the data in an explicitly inactive, versioned listing-data source that is not loaded by public pages while listings are paused, or keep it in a clearly documented archive excluded from live assets. Restore only after brokerage authorization and property verification.
- **Priority:** High
- **Manual confirmation:** Yes — confirm retention/access requirements for historic data.

### H-05 — Reviews and blog pages have not adopted the site accessibility/navigation pattern

- **Affected files:** `reviews.html:19-37`, `blog.html:22-43`, `blog/*.html:22-42`
- **Evidence:** These files use an `<i id="menu-icon">` rather than the accessible menu button used on optimized pages; they have no skip link and their main landmarks lack the established `id="main-content" tabindex="-1"` pattern. Their navigation lacks accessible labels/current-page state.
- **Why it matters:** Navigation and content discoverability are weaker for keyboard/screen-reader users. It also leaves the site with inconsistent shared components and increased regression risk.
- **Recommended fix:** Apply the already established header, skip-link, main-landmark, modal, and footer conventions to these remaining pages without altering their design.
- **Priority:** High
- **Manual confirmation:** Browser/keyboard testing required.

### H-06 — Homepage canonical is the root URL, but `index.html` remains a live alternate URL

- **Affected files:** `index.html:7-13`; links throughout templates such as `blog.html:24,31`
- **Evidence:** The homepage declares `https://agentarmijo.com/` canonical, while the repository exposes `index.html` and several pages link directly to `index.html`.
- **Why it matters:** Canonical tags are hints; without a server redirect, both URLs may be crawled and split signals.
- **Recommended fix:** Confirm that `https://agentarmijo.com/index.html` permanently redirects to `https://agentarmijo.com/`. Normalize internal home links to `/` (or the agreed canonical representation) after confirming the hosting behavior.
- **Priority:** High
- **Manual confirmation:** Yes — production HTTP status/header test required.

## 4. Medium-priority improvements

### M-01 — No structured data is present

- **Affected files:** all public HTML pages; no `application/ld+json` found
- **Why it matters:** Correct structured data can clarify entity identity and page purpose, but only when it matches visible, verified content.
- **Recommended fix:** See the structured-data recommendations below. Start with a site-wide `WebSite` entity and a carefully verified `Person`; defer business-address-dependent schema and all review/listing schema.
- **Priority:** Medium
- **Manual confirmation:** Yes — entity/business facts must be approved.

### M-02 — `reviews.html` has missing essential SEO metadata

- **Affected file:** `reviews.html:4-17`
- **Evidence:** The page has only a title (`Reviews| Nick Armijo Real Estate`), no description, canonical, or OG tags.
- **Why it matters:** The page will have weak or inconsistent snippets and social previews; its short title formatting is inconsistent with the rest of the site.
- **Recommended fix:** Complete the metadata only after its review/testimonial claims are approved. If the content cannot be validated promptly, consider keeping it out of the sitemap or using `noindex` temporarily rather than making unsupported claims more discoverable.
- **Priority:** Medium
- **Manual confirmation:** Yes.

### M-03 — Placeholder links remain on public pages

- **Affected files:** `blog.html:266-267`; `reviews.html:291-294,315-316`
- **Evidence:** Footer/resource links still use `href="#"`.
- **Why it matters:** They create dead-end navigation and can be interpreted as low-quality internal-link behavior.
- **Recommended fix:** Replace only with existing relevant pages (for example, buy/sell/blog where the label is accurate) or render non-link text until a real destination exists. Do not invent policy/resource URLs.
- **Priority:** Medium
- **Manual confirmation:** No for removal/non-link treatment; yes if linking to new legal/resource pages.

### M-04 — Blog archive labels and link labels do not match article intent

- **Affected file:** `blog.html:113-134`
- **Evidence:** The Palmdale-vs-Lancaster buying article is labeled `Seller Guide` at line 114 and its icon link says `Read the Lancaster home selling guide` at line 132.
- **Why it matters:** Misclassification confuses readers, weakens internal topical relationships, and harms content-quality signals.
- **Recommended fix:** Label the article as a buyer/local-market guide and update the accessible link label to describe its actual destination.
- **Priority:** Medium
- **Manual confirmation:** No.

### M-05 — Generic or inaccurate image alternative text remains, especially in articles

- **Affected files:** `blog.html:54-55`; `blog/good-time-to-buy-antelope-valley.html:60`; `blog/palmdale-home-prices.html:60`; `blog/palmdale-vs-lancaster.html:61`; `blog/best-neighborhoods-antelope-valley.html:60`; `reviews.html:165`
- **Evidence:** Several distinct blog images share `alt="Bright home interior"`; the featured review uses a client image with `alt="Luxury home exterior"`.
- **Why it matters:** Inaccurate alternatives reduce accessibility and do not provide reliable contextual understanding.
- **Recommended fix:** Inspect each asset and use concise, accurate alternatives; use empty alt text for purely decorative images.
- **Priority:** Medium
- **Manual confirmation:** Yes — image content must be visually reviewed.

### M-06 — All 45 HTML `<img>` elements omit dimensions and lazy-loading

- **Affected files:** all HTML templates; representative hero/listing images at `index.html:61-71,111`, `blog.html:54`, and `reviews.html:53`
- **Evidence:** Repository scan found 45 `<img>` tags, zero `loading="lazy"` attributes, and zero HTML `width`/`height` attributes.
- **Why it matters:** Below-the-fold images may delay mobile rendering; missing intrinsic dimensions can contribute to layout shift.
- **Recommended fix:** Preserve eager/high-priority treatment for the likely LCP hero image on each page. Add accurate width/height (or CSS aspect-ratio) for all images and `loading="lazy" decoding="async"` to non-critical images after visual testing.
- **Priority:** Medium
- **Manual confirmation:** Yes — run Lighthouse/PageSpeed after changes.

### M-07 — Large background/image assets are likely to affect mobile performance

- **Affected files:** `assets/images/backgrounds/widepalmdaleshot.webp` (1.7 MB), `assets/images/backgrounds/poppiespic.webp` (1.5 MB), `assets/images/about/aboutme.webp` (844 KB); CSS references at `styles.css:2065,2778`
- **Why it matters:** Large image transfer can affect LCP and mobile data use. CSS backgrounds do not support native image lazy-loading in the same way as `<img>`.
- **Recommended fix:** Measure rendered dimensions and responsive variants. Produce appropriately sized modern derivatives and use responsive HTML images where semantics allow. Do not remove current images until the visual result and production cache behavior are tested.
- **Priority:** Medium
- **Manual confirmation:** Yes — requires Lighthouse/PageSpeed and visual comparison.

### M-08 — External Font Awesome script is render-blocking in the document head

- **Affected files:** all public HTML documents; for example `index.html:21`, `blog.html:19`
- **Evidence:** Font Awesome is loaded as a synchronous third-party script in every head. Google Fonts stylesheet is also requested before local CSS.
- **Why it matters:** Third-party script and font loading can affect render timing and consistency.
- **Recommended fix:** Measure first. Consider `defer` for noncritical scripts where compatible and a self-hosted/icon-SVG strategy only as a planned performance task. Keep the current setup until behavior is tested.
- **Priority:** Medium
- **Manual confirmation:** Yes.

### M-09 — Local-service area wording is broader than the stated primary market in some templates

- **Affected files:** `index.html:8,52`; `services.html:57,148,219`; `about.html:103`; `contact.html:315-316`; `reviews.html:119-136`
- **Evidence:** Primary focus is Palmdale, Lancaster, and the Antelope Valley, while pages also name Santa Clarita and the reviews page includes Los Angeles. No service-area policy or brokerage confirmation is in the repository.
- **Why it matters:** Inconsistent local signals can dilute the primary market and create accuracy concerns.
- **Recommended fix:** Confirm each service area Nick actively serves. Use Palmdale, Lancaster, and Antelope Valley as the primary description; retain other communities only when confirmed. Do not add an address or office location without verification.
- **Priority:** Medium
- **Manual confirmation:** Yes.

## 5. Low-priority opportunities

### L-01 — Social previews lack an `og:image`

- **Affected files:** optimized core pages, e.g. `index.html:10-13`; blog/review pages have no OG block at all
- **Why it matters:** Shares may have less compelling or inconsistent previews.
- **Recommended fix:** Select one rights-cleared existing image per page type only after confirming its absolute production URL and dimensions. Add matching `og:image:alt`.
- **Priority:** Low
- **Manual confirmation:** Yes — verify public URL/social debugger output.

### L-02 — Published content needs a documented editorial maintenance process

- **Affected files:** `blog/*.html`
- **Evidence:** Articles show an author and a publication date but no modified date, editorial policy, source log, or market-data refresh mechanism.
- **Why it matters:** Local market content requires ongoing review to remain dependable for users and AI systems.
- **Recommended fix:** Maintain a small source log, visible updated date when material changes occur, and a quarterly review schedule for market-dependent articles.
- **Priority:** Low
- **Manual confirmation:** Yes.

### L-03 — No analytics or webmaster verification code is present in the repository

- **Affected files:** all public HTML; repository-wide scan found no GA, GTM, Search Console, or Bing verification references
- **Why it matters:** The repository alone does not demonstrate performance/conversion/search monitoring.
- **Recommended fix:** First confirm whether tracking/verification is injected by hosting, a CDN, or DNS. Add privacy-compliant analytics or verification only with explicit approval and a measurement plan.
- **Priority:** Low
- **Manual confirmation:** Yes.

## 6. Page-by-page audit table

| Page | Verified strengths | Findings / references | Priority |
| --- | --- | --- | --- |
| `index.html` | Unique title/description/canonical/OG; one H1; accessible main/header pattern. | Stale live listing cards and prices at `99-179`; canonical root vs possible `/index.html` duplicate at `7-13`; no JSON-LD. | Critical / High |
| `about.html` | Unique metadata; one H1; established accessibility pattern; personal author context. | Footer says Santa Clarita at `103`; confirm it remains an accurate service area. No JSON-LD. | Medium |
| `buy.html` | Unique metadata, H1, canonical/OG, local buyer intent. | No JSON-LD or OG image; footer area language needs consistency review. | Low / Medium |
| `sell.html` | Unique metadata, H1, canonical/OG, local seller intent. | No JSON-LD or OG image; footer area language needs consistency review. | Low / Medium |
| `invest.html` | Unique metadata, H1, canonical/OG; copy qualifies investment outcomes. | No JSON-LD/OG image; investment content should continue to avoid advisory/guarantee claims. | Low |
| `services.html` | Unique metadata, H1, canonical/OG, service-card hierarchy. | Names Santa Clarita, Quartz Hill, and Rosamond at `57,148,219`; confirm service boundaries. Testimonial at `187` needs source confirmation before any schema. | Medium |
| `contact.html` | Unique metadata, H1, canonical/OG, crawlable contact details and service area. | No JSON-LD/OG image. Confirm privacy wording and footer geographic scope. | Low / Medium |
| `listings.html` | Unique metadata, canonical/OG, one H1, inactive card/template and current empty state. | Historic listings are retained in template at `64-383`; data remains in `script.js:730-1018`. No listing schema should be added. | High |
| `reviews.html` | One H1 and crawlable main content. | No description/canonical/OG at `4-17`; old menu semantics `19-37`; placeholder links `291-316`; unverified metrics/reviews `141-179`. | High |
| `blog.html` | Unique archive title/description, H1, crawlable article links and author/date display. | No canonical/OG at `4-20`; old navigation at `22-43`; placeholders `266-267`; category/link-label mismatch `113-134`. | High / Medium |
| `blog/good-time-to-buy-antelope-valley.html` | One H1, visible author/date, internally linked related articles. | Duplicate generic metadata `7-9`; no canonical/OG/schema; generic intro at `49-51`; market claims at `68-120` need sources. | Critical / High |
| `blog/palmdale-home-prices.html` | One H1, visible author/date, useful local question structure. | Duplicate/wrong metadata `7-9`; H1 incorrectly repeats another article at `47`; placeholder intro `49-51`; typo at `68`; numeric claims `71-196` need sources. | Critical / High |
| `blog/palmdale-vs-lancaster.html` | One H1, visible author/date, comparison intent. | Duplicate/wrong metadata `7-9`; no canonical/OG/schema; numbers and inventory claims `83-196` need linked sources. | Critical / High |
| `blog/best-neighborhoods-antelope-valley.html` | One H1, visible author/date, locally focused structure. | Duplicate/wrong metadata `7-9`; no canonical/OG/schema; neighborhood pricing claims `90-171` need sources. | Critical / High |

## 7. Structured data recommendations

No JSON-LD or other Schema.org markup was found. Add structured data only after the corresponding facts are verified and reflected in visible content.

| Type | Recommended location | Safe verified fields | Do not add without confirmation |
| --- | --- | --- | --- |
| `WebSite` | Homepage, or a shared head include once one exists | Site name, canonical home URL | SearchAction if there is no on-site search |
| `Person` | Homepage/About page | Nick Armijo, canonical website URL, DRE number only if its syntax/property is validated for the selected type, verified social profile URLs | Brokerage, office address, certifications, awards, years/transaction volume |
| `RealEstateAgent` or `LocalBusiness` subtype | Only after brokerage/business identity, address/service-area policy, and eligibility are confirmed | Phone/email only if intended as public business contact | A street address, opening hours, aggregate ratings, brokerage name, geocoordinates, or service-area assertions not confirmed |
| `BreadcrumbList` | Blog article pages | Visible path: Home > Blog > Article | Invisible/nonexistent hierarchy |
| `BlogPosting` | Each approved published article | Headline, canonical URL, visible author, visible published/modified dates, verified image | Unverified dates, publisher logos, unsupported claims, ratings |

Do **not** add `Product`, `Offer`, `Residence`, `RealEstateListing`, `Review`, `AggregateRating`, or FAQ schema for paused listings, self-authored FAQ content, or unverified testimonials.

## 8. Local SEO and GEO readiness

### Verified in repository

- Name: **Nick Armijo** is consistently used.
- DRE license: **02208540** appears in shared headers.
- Phone: **(661) 443-6441** / `tel:6614436441` is consistently used.
- Email: **agentarmijo@gmail.com** is consistently used.
- Strong primary local phrasing is present on optimized pages for Palmdale, Lancaster, and the Antelope Valley.
- The about page gives useful, visible author context: born and raised in the Antelope Valley and bilingual English/Spanish (`about.html:61-75`).

### Requires confirmation or improvement

- No brokerage name, office address, or Google Business Profile URL is present. Do not infer any of them.
- Santa Clarita, Los Angeles, Quartz Hill, and Rosamond appear inconsistently. Confirm actual service boundaries before elevating them in metadata/schema.
- Published market data lacks direct source links and a refresh process.
- The homepage stale-listing block and reviews metrics conflict with the stated brokerage-transition goal and need approval/removal before broader discovery work.

### GEO readiness assessment

Core service content is crawlable HTML with clear headings and contact paths, which is a good baseline. The strongest next improvements are factual: maintain accurate listings, provide attributable local-market sources, standardize person/business identity, and create clear topical internal links from articles to relevant buy/sell/contact pages. No speculative "GEO certification" or AI-ranking tactic is recommended.

## 9. External verification tasks

These cannot be proven from the repository and should be checked in production:

1. Confirm HTTPS, `www`/non-`www`, trailing-slash, and `/index.html` redirects; select one URL convention.
2. Confirm every canonical URL returns `200`, self-canonicalizes, and is indexable.
3. Test `robots.txt` and `sitemap.xml` after deployment, then submit them to Google Search Console and Bing Webmaster Tools.
4. Run Google Rich Results Test after approved schema is deployed.
5. Run Lighthouse/PageSpeed on mobile and desktop, focusing on LCP/CLS for image-heavy heroes and Font Awesome/Google Font requests.
6. Use Search Console URL Inspection to verify rendered content does not show retired listing cards or prices.
7. Validate all review counts, ratings, sales figures, testimonials, market-data sources, service areas, brokerage identity, and any social-preview image rights/URLs.
8. Verify whether analytics, conversion tracking, CSP/security headers, caching, compression, and webmaster verification are injected outside this repository.

## 10. Phased implementation plan

### Phase 1 — Accuracy and indexing control (small, safe batch)

1. Pause/remove live homepage featured listings using the existing listing feature-flag approach.
2. Correct article titles, descriptions, article H1/intro mismatches, archive labels, and placeholder links.
3. Add `robots.txt` and a canonical-only sitemap after production redirect behavior is confirmed.
4. Decide whether unverified reviews/metrics should be confirmed, revised, or temporarily removed/noindexed.

### Phase 2 — Remaining page parity and factual content

1. Bring `blog.html`, `blog/*.html`, and `reviews.html` to the established skip-link/menu/modal/navigation pattern.
2. Add canonical and OG metadata to all approved blog/reviews pages.
3. Validate every numeric market claim, add source links/updated dates, and remove any unsupported claims.
4. Normalize service-area wording after business confirmation.

### Phase 3 — Entity and performance enhancements

1. Add approved `WebSite`, `Person`, breadcrumb, and article JSON-LD.
2. Add accurate image dimensions/lazy loading and responsive image variants, informed by Lighthouse.
3. Evaluate Font Awesome/font delivery and deploy approved analytics/webmaster verification.

## Recommended first small, safe batch

1. **Critical:** Hide the public homepage featured listing cards and prices; retain their code/data only in the same controlled inactive system used for `listings.html`.
2. **Critical:** Correct the four blog article `<title>` and meta-description pairs so each matches its own H1; add canonical URLs.
3. **High:** Add `robots.txt` and `sitemap.xml` only after a production redirect/canonical check confirms the final public URL set.
4. **High:** Hold off on review schema, ratings schema, listing schema, and business-address schema until the underlying information is documented and approved.
