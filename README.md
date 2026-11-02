# dnsakibss.github.io

Personal portfolio website for Nazmus Sakib.

## Publish on GitHub Pages

1. Create a **public** repository named exactly `dnsakibss.github.io`.
2. Upload everything in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Your site will be available at:
  [https://dnsakibss.github.io/portfolio/](https://dnsakibss.github.io/portfolio/)

## Add your personal files

Put these files into the indicated locations:

- `assets/profile.jpg` profile photo
- `assets/cv.pdf` CV
- `assets/research/paper-1.pdf`, `paper-2.pdf` research papers
- `assets/certificates/certificate-1.jpg` etc. certificates

Then edit `index.html` to replace placeholder publication information and your email.

## Projects

The featured project links are already connected to your GitHub repositories:
- CivicLens
- CivicLens2.0
- Wearable Fatigue Detection
- 4-Scene Transportation Environment
- Library Management System
- Hotel Management System
- Project Simulator

## Project pages

- Edit `projects-data.js` to change project text, tags or images (one entry per project).
- Images go in `assets/projects/<project-id>/`. `hotel-management-system/cover.png` is still missing: save a screenshot there.
- Certificates: add `assets/certificates/certificate-01.jpg` ... `certificate-04.jpg`; the placeholders are replaced automatically and clicking opens a larger view.

## Interactive features

All plain HTML/CSS/JS, no libraries or build step.

- **Light/dark theme** toggle in the nav (remembers the visitor's choice)
- **Animations:** hero entrance, typing role text, floating blobs, rotating photo ring, scroll-reveal on every section, counters, timeline line that draws in
- **Projects:** filter buttons are generated from the `group` field in `projects-data.js`; the first project is shown as "Featured"
- **Skills:** chips that match a project tag become clickable and filter the projects list
- **Lightbox:** certificates and project galleries open full-screen; browse with ← → keys, arrow buttons or swipe
- **Extras:** scroll progress bar, active-section nav highlight, back-to-top button, click-to-copy email
- Motion is turned off automatically for visitors who set "reduce motion" in their OS
