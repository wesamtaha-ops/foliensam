# Admin Panel Guide - FolienSam Website

## 📋 Overview

The Admin Panel allows you to manage your website content including:
- **Hero Section**: Main background image, circle video/GIF, and YouTube video
- **Gallery**: Add, edit, and delete gallery images and YouTube videos
- **Services**: Manage service offerings with images and details
- **Settings**: Change admin password

## 🔐 Accessing the Admin Panel

1. Navigate to: `http://your-domain.com/admin`
   - For local development: `http://localhost:5173/admin`

2. **Default Login Credentials:**
   - Password: `admin123`
   - ⚠️ **IMPORTANT**: Change this password immediately after first login!

## 🎯 Features

### 1. Hero Section Management

Manage the main hero section of your website:

- **Main Background Image URL**: The large background image visible on the hero section
- **Hero Circle Video/GIF URL**: The circular video/GIF that appears on the right side
- **YouTube Video ID**: The video that plays when users click the play button

**How to update:**
1. Go to Admin Panel → Hero Section
2. Enter new URLs or YouTube video ID
3. Preview your changes
4. Click "Save Changes"

### 2. Gallery Management

Add and manage gallery items (images and YouTube videos):

**Adding a New Item:**
1. Click "Add Item" button
2. Select type: Image or YouTube Video
3. Fill in the details:
   - **For Images**: Enter image URL, title, and category
   - **For YouTube Videos**: Enter video ID, thumbnail URL, title, and category
4. Click "Add"

**Editing an Item:**
1. Hover over any gallery item
2. Click the edit (pencil) icon
3. Update the details
4. Click "Update"

**Deleting an Item:**
1. Hover over any gallery item
2. Click the delete (trash) icon
3. Confirm deletion

**YouTube Video ID Format:**
- From URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Example: `udbvm6bulGU`
- Thumbnail: `https://i3.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`

### 3. Services Management

Manage your service offerings:

**Adding a New Service:**
1. Click "Add Service" button
2. Fill in all translation keys (these refer to your i18n translation files)
3. Enter image URL
4. Select icon type
5. Click "Add"

**Service Fields:**
- **Title Key**: Translation key for service title (e.g., `services.carWrapping.title`)
- **Description Key**: Translation key for description
- **Image URL**: Service image URL
- **Icon**: Choose from available icons (Car, Shield, Sparkles, Palette, Sun, Building)
- **Category, Duration, Warranty Keys**: Translation keys for these fields
- **Features & Process Keys**: Translation keys for arrays

**Note**: Services use the i18n translation system. Make sure your translation keys exist in your locale files (`src/i18n/locales/`).

### 4. Settings

**Change Admin Password:**
1. Go to Settings tab
2. Enter current password
3. Enter new password (minimum 6 characters)
4. Confirm new password
5. Click "Update Password"

## 💾 Data Storage

All content is stored in your browser's **localStorage**:
- Hero data: `folien_sam_hero_data`
- Gallery: `folien_sam_gallery_images`
- Services: `folien_sam_services`
- Password: `folien_sam_admin_password`

### Important Notes:
- ✅ Data persists across browser sessions
- ⚠️ Data is browser-specific (different browsers = different data)
- ⚠️ Clearing browser data will reset everything to defaults
- ⚠️ Data is NOT shared between devices

## 🚀 Quick Start Guide

### First Time Setup:

1. **Access Admin Panel**
   ```
   http://localhost:5173/admin
   ```

2. **Login with default password**
   ```
   admin123
   ```

3. **Change Password (Important!)**
   - Go to Settings
   - Set a secure password
   - Remember it! (No recovery system)

4. **Update Hero Section**
   - Add your main images and videos
   - Save changes

5. **Add Gallery Items**
   - Add your car wrapping images
   - Add YouTube showcase videos

6. **Customize Services**
   - Update service images
   - Ensure translation keys match your locale files

## 🔧 Development

### Running the Project:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### File Structure:

```
src/
├── components/
│   ├── admin/
│   │   ├── Admin.tsx              # Main admin component
│   │   ├── AdminLogin.tsx         # Login screen
│   │   ├── AdminDashboard.tsx     # Dashboard layout
│   │   ├── HeroManager.tsx        # Hero section manager
│   │   ├── GalleryManager.tsx     # Gallery manager
│   │   ├── ServicesManager.tsx    # Services manager
│   │   └── SettingsManager.tsx    # Settings manager
│   ├── Hero.tsx                   # Updated to use dynamic data
│   ├── Gallery.tsx                # Updated to use dynamic data
│   └── Services.tsx               # Updated to use dynamic data
├── services/
│   └── dataService.ts             # Data management service
└── App.tsx                        # Updated with routing
```

## 🔒 Security Considerations

**Current Implementation:**
- Simple password authentication
- LocalStorage for data persistence
- Client-side only (no backend)

**Limitations:**
- ⚠️ Not suitable for production if security is critical
- ⚠️ Password stored in plain text in localStorage
- ⚠️ No session timeout
- ⚠️ No password recovery

**For Production:**
Consider implementing:
- Backend API with proper authentication (JWT, OAuth)
- Database for data storage (PostgreSQL, MongoDB, etc.)
- File upload service (AWS S3, Cloudinary, etc.)
- User roles and permissions
- Password hashing and encryption
- Session management
- HTTPS/SSL certificates

## 📱 Mobile Support

The admin panel is responsive and works on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile phones

## 🐛 Troubleshooting

### Issue: Can't login
- **Solution**: Check if you changed the password. Try default: `admin123`
- If still locked out, open browser console and run:
  ```javascript
  localStorage.setItem('folien_sam_admin_password', 'admin123');
  ```
  Then refresh the page.

### Issue: Changes not showing
- **Solution**: Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Lost all data
- **Solution**: If localStorage was cleared, default data will be restored automatically on next page load.

### Issue: Images not loading
- **Solution**: Check image URLs are accessible and use HTTPS

## 📞 Support

For additional help or feature requests, please contact the development team.

## 🎨 Customization

You can customize the admin panel by modifying the components in `/src/components/admin/`.

### Changing Colors:
The admin panel uses Tailwind CSS with your existing color scheme:
- Primary: `accent-purple`
- Accent: `accent-gold`
- Background: `primary-dark`

### Adding New Fields:
1. Update `dataService.ts` to include new fields
2. Update corresponding manager component
3. Update the display component to use the new fields

## ✨ Features to Add (Future Enhancement)

Potential improvements:
- [ ] Image upload directly from computer
- [ ] Drag-and-drop image reordering
- [ ] Bulk operations
- [ ] Export/Import data as JSON
- [ ] Preview changes before saving
- [ ] Activity log
- [ ] Multiple admin users
- [ ] Backend integration
- [ ] Cloud storage for images

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Created for**: FolienSam - Car Wrapping Website

