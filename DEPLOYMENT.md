# The Walkers’ Story — GitHub Pages Launch Checklist

## 1. Create the GitHub repository

- Sign in to GitHub and create a new **public** repository.
- Recommended repository name: `the-walkers-story`
- Do not initialize it with a README, license, or `.gitignore` if you plan to push this existing folder.

## 2. Upload the website

The public website needs these items from this folder:

- `index.html`
- `styles.css`
- `script.js`
- `.nojekyll`
- the complete `assets` folder

Files used only by the local preview/build process do not need to be published.

## 3. Turn on GitHub Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder.
4. Save and wait for GitHub to show the temporary website address.
5. Open that address and test the navigation, photos, Gift Fund link, calendar link, and RSVP form.

## 4. Connect the Squarespace domain

After purchasing the domain:

1. In GitHub, open **Settings → Pages** and enter the custom domain first.
2. In Squarespace Domains, open the domain's DNS settings.
3. For the root domain, add GitHub's four `A` records.
4. For `www`, add a `CNAME` record pointing to `YOUR-GITHUB-USERNAME.github.io`.
5. Return to GitHub Pages and enable **Enforce HTTPS** when it becomes available.

GitHub's current root-domain `A` records are:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

## 5. Final RSVP check

Submit one clearly labeled test RSVP after the public site is live. Confirm that it appears in the correct Google Sheet, then remove the test response.

## Updating the site later

Yes—you can replace photos, change text, add venue information, or reveal the wedding party later. Update the files in the same GitHub repository; GitHub Pages will republish the site automatically.
