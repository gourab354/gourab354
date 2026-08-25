# Gourab's Professional Portfolio v2.0

A modern, interactive portfolio website for showcasing IoT projects, certifications, and professional achievements. Built with React, Framer Motion, Tailwind CSS, and Vite.

## ✨ Features

- **🎯 Modern Hero Section** - Eye-catching introduction with animated gradient text
- **📊 Achievement Stats** - Showcase your accomplishments and milestones
- **🛠️ Projects Showcase** - Filter and display your IoT, web, and ML projects
- **📜 Certificate Gallery** - Easy certificate management with upload functionality
- **🎨 Smooth Animations** - Framer Motion animations throughout the site
- **📱 Fully Responsive** - Mobile, tablet, and desktop optimized
- **🌐 SEO Optimized** - Meta tags and structured data for better visibility
- **⚡ Fast Performance** - Built with Vite for lightning-fast load times
- **🔗 Social Integration** - Links to GitHub, LinkedIn, Instagram, and Email
- **📧 Contact Form** - Integrated contact form for inquiries

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/gourab354/gourab-portfolio-v2.git
cd gourab-portfolio-v2
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:5173`

## 📁 Project Structure

```
gourab-portfolio-v2/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Certificates.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
│   ├── projects/
│   └── certificates/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🎨 Customization

### Update Your Information

1. **Home Page** (`src/pages/Home.jsx`)
   - Update hero title and description
   - Modify stats array with your achievements
   - Update skills categories
   - Change featured project details

2. **About Page** (`src/pages/About.jsx`)
   - Edit bio section
   - Update journey timeline
   - Modify core competencies
   - Update statistics

3. **Projects Page** (`src/pages/Projects.jsx`)
   - Add/remove projects in the projects array
   - Include project links, tags, and descriptions
   - Update project images and highlights

4. **Certificates Page** (`src/pages/Certificates.jsx`)
   - Add certificates in the initial state
   - Upload certificate images to `public/certificates/`
   - Update certificate categories and dates

5. **Contact Page** (`src/pages/Contact.jsx`)
   - Update social links
   - Configure form submission (integrate with backend)
   - Update contact information

6. **Navigation** (`src/components/Navigation.jsx`)
   - Modify navigation links
   - Update GitHub profile URL
   - Change branding/logo

## 📸 Adding Content

### Add a New Project

Edit `src/pages/Projects.jsx` and add to the projects array:

```javascript
{
  id: 7,
  title: 'Your Project Title',
  description: 'Brief description',
  category: 'hardware',
  tags: ['ESP32', 'React', 'Node.js'],
  image: '🚀',
  highlights: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  github: 'https://github.com/yourusername/project',
  demo: 'https://project-demo.com'
}
```

### Add a Certificate

Edit `src/pages/Certificates.jsx` and add to the certificates array:

```javascript
{
  id: 4,
  title: 'Certificate Title',
  issuer: 'Issuing Organization',
  date: 'Month Year',
  description: 'Description',
  image: '/certificates/certificate-image.jpg',
  link: 'https://certificate-link.com',
  category: 'competition'
}
```

Then upload the certificate image to `public/certificates/` folder.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

### Deploy to GitHub Pages

1. **Update vite.config.js**
```javascript
export default {
  base: '/gourab-portfolio/',
  // ... rest of config
}
```

2. **Build and deploy**
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🎯 Recommended Configuration

### Custom Domain
- Purchase a domain (Namecheap, GoDaddy, etc.)
- Point DNS to your deployment platform
- Configure custom domain in platform settings

### Analytics
Add Google Analytics for tracking:
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Form Backend
Connect the contact form to a backend service:
- Formspree: [formspree.io](https://formspree.io)
- EmailJS: [emailjs.com](https://emailjs.com)
- Custom Node.js backend

## 🔧 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify/GitHub Pages

## 📝 Content Tips

### Project Descriptions
- Keep descriptions concise (2-3 sentences)
- Highlight the problem solved
- Mention key technologies used

### Highlight Points
- Focus on unique features
- Mention challenges overcome
- Show impact or results

### Tags
- Use relevant, searchable keywords
- Include programming languages
- Add frameworks and tools

### Images
- Use emoji for quick visual representation
- Or upload actual project images to `public/projects/`
- Keep file sizes optimized

## 🔐 Best Practices

- ✅ Keep sensitive information out of the code
- ✅ Use environment variables for API keys
- ✅ Regular backups of your portfolio
- ✅ Update projects and achievements regularly
- ✅ Test on multiple devices and browsers
- ✅ Monitor analytics and user behavior
- ✅ Keep dependencies updated

## 📊 Performance Optimization

- Lazy load images with Next.js Image or similar
- Minimize bundle size
- Use CDN for assets
- Enable gzip compression
- Optimize fonts loading
- Use WebP format for images

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. Share improvements via pull requests!

## 📄 License

This portfolio template is open source and available under the MIT License.

## 📞 Support

For questions or issues:
- Email: gourabd911@gmail.com
- GitHub: https://github.com/gourab354
- LinkedIn: https://linkedin.com/in/gourab354

## 🎉 Version History

### v2.0 (Current)
- Complete redesign with modern aesthetics
- Certificate management system
- Improved animations and UX
- Better mobile responsiveness
- Enhanced project filtering

### v1.0
- Initial portfolio release
- Basic project showcase
- Contact form

---

**Made with ❤️ by Gourab**

*Build something awesome!* 🚀
