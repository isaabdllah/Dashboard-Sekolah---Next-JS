# 🏫 Dashboard Sekolah

Modern school management dashboard built with Next.js 14 and TypeScript.

## ✨ Features

- 📊 **Analytics Dashboard** - Interactive charts and statistics
- 👥 **Student Management** - Complete CRUD operations for student data  
- 🏫 **Class Management** - Manage school classes and assignments
- ⚠️ **Violation Tracking** - Track and manage student violations with detailed reporting
- 🔐 **Authentication System** - Secure login and registration
- 📱 **Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI Components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation
- **Mock Data**: Frontend-only development setup

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/isaabdllah/Dashboard-Sekolah---Next-JS.git

# Navigate to project
cd Dashboard-Sekolah---Next-JS

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
app/                    # Next.js App Router pages
├── auth/              # Authentication pages
│   ├── login/
│   └── register/
├── dashboard/         # Main dashboard pages
│   ├── kelas/        # Class management
│   ├── siswa/        # Student management
│   └── pelanggaran/  # Violation tracking
components/            # Reusable React components
├── Dashboard/         # Analytics components
├── Kelas/            # Class management components
├── Siswa/            # Student management components
├── Pelanggaran/      # Violation components
├── Layout/           # Layout components
└── ui/               # UI component library (Shadcn/UI)
lib/                  # Utilities and mock API
```

## 🎯 Available Pages

### Authentication
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Dashboard
- `/dashboard` - Main dashboard with analytics
- `/dashboard/siswa` - Student management with CRUD operations
- `/dashboard/kelas` - Class management system
- `/dashboard/pelanggaran` - Violation tracking list
- `/dashboard/pelanggaran/[id]` - Detailed violation view

## 🧩 Key Components

### Dashboard Analytics
- **StatCard** - Display key statistics
- **Charts** - 8 different chart types (Gender ratio, trends, distributions)
- **Interactive Filters** - Real-time data filtering

### Student Management
- **Student Table** - Sortable and searchable student list
- **Add/Edit Forms** - Complete student information forms
- **Bulk Operations** - Import/export functionality

### Violation System
- **Violation Tracking** - Complete violation lifecycle
- **Evidence Upload** - Support for file attachments
- **Status Management** - Pending, In Progress, Completed

## 📦 Dependencies

```json
{
  "next": "14.0.0",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.3.0",
  "recharts": "^2.15.4",
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.294.0"
}
```

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎨 UI Components

Built with **Shadcn/UI** for consistent and accessible design:
- Buttons, Forms, Dialogs
- Tables, Cards, Badges
- Navigation, Dropdowns
- Charts and Data Visualization

## 📊 Mock Data

The application includes comprehensive mock data for:
- Student records (300+ entries)
- Class information
- Violation records with different severity levels
- Analytics data for charts

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔄 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced reporting system
- [ ] Mobile app (React Native)
- [ ] Multi-school support
- [ ] Advanced user roles

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 💡 Support

For support and questions:
- Create an issue in the repository
- Contact: [Your Email]

---

**Built with ❤️ for modern school management**
