# 🚀 Admin Panel - Quick Reference

## 🔗 Access URL
```
Local: http://localhost:5173/admin
Production: https://your-domain.com/admin
```

## 🔑 Login
**Default Password**: `admin123`

> ⚠️ Change immediately in Settings tab!

---

## 📋 Quick Actions

### Hero Section
1. Go to **Hero Section** tab
2. Update image URLs
3. Change YouTube video ID
4. Click **Save Changes**

### Gallery
| Action | Steps |
|--------|-------|
| **Add Image** | Click `Add Item` → Select `Image` → Enter URL → Save |
| **Add Video** | Click `Add Item` → Select `YouTube` → Enter Video ID → Save |
| **Edit** | Hover item → Click ✏️ → Update → Save |
| **Delete** | Hover item → Click 🗑️ → Confirm |

### Services
| Action | Steps |
|--------|-------|
| **Add Service** | Click `Add Service` → Fill all fields → Save |
| **Edit** | Click `Edit` on service card → Update → Save |
| **Delete** | Click `Delete` → Confirm |

---

## 🎯 Image URL Format
```
https://example.com/image.jpg
https://images.unsplash.com/photo-123...
https://images.cood.ai/samgo/001.png
```

## 📹 YouTube Format
**Video ID from URL:**
```
URL: https://www.youtube.com/watch?v=udbvm6bulGU
ID:  udbvm6bulGU
```

**Thumbnail:**
```
https://i3.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg
```

---

## 🔄 Translation Keys

Services use i18n translation keys. Format:
```
services.serviceName.field

Examples:
- services.carWrapping.title
- services.windowTinting.description
- services.paintProtection.features
```

---

## 💾 Data Storage

| Type | Storage Key |
|------|-------------|
| Hero | `folien_sam_hero_data` |
| Gallery | `folien_sam_gallery_images` |
| Services | `folien_sam_services` |
| Password | `folien_sam_admin_password` |

---

## 🆘 Emergency Reset

**Lost Password?**
```javascript
// In browser console (F12)
localStorage.setItem('folien_sam_admin_password', 'admin123');
```

**Reset All Data?**
```javascript
// In browser console (F12)
localStorage.clear();
```
Then refresh page to restore defaults.

---

## 📱 Icons Available

- Car
- Shield  
- Sparkles
- Palette
- Sun
- Building

---

## ✅ Best Practices

1. ✅ Use high-quality images (min 1920x1080)
2. ✅ Use HTTPS URLs only
3. ✅ Test YouTube videos before adding
4. ✅ Keep translation keys consistent
5. ✅ Backup data regularly (export localStorage)
6. ✅ Change default password immediately
7. ✅ Use descriptive titles and categories

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Can't login | Try default password or reset |
| Changes not visible | Hard refresh (Ctrl+Shift+R) |
| Images not loading | Check URL is valid and HTTPS |
| Service not showing | Check translation keys exist |

---

**Need More Help?** See full guide: `ADMIN_PANEL_GUIDE.md`

