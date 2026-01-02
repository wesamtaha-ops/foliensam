# ✅ Create Cloudinary Upload Preset - Step by Step

## 🎯 Problem
"Upload preset must be whitelisted for unsigned uploads"

## 🔧 Solution: Create Unsigned Preset

### Step 1: Open Upload Settings
Go to: https://console.cloudinary.com/settings/upload

You'll see a page with various settings.

---

### Step 2: Scroll Down
Scroll to the bottom until you see **"Upload presets"** section

---

### Step 3: Add New Preset
Click the blue **"Add upload preset"** button

---

### Step 4: Configure Preset

You'll see a form. Fill it in like this:

```
┌─────────────────────────────────────────────────┐
│ Upload Preset Settings                          │
├─────────────────────────────────────────────────┤
│                                                 │
│ Preset name:                                    │
│ ┌─────────────────────────────────────┐        │
│ │ folien_sam_uploads                  │        │
│ └─────────────────────────────────────┘        │
│                                                 │
│ Signing Mode: ⚠️ VERY IMPORTANT!               │
│ ┌─────────────────────────────────────┐        │
│ │ (●) Unsigned  ← SELECT THIS!        │        │
│ │ ( ) Signed                           │        │
│ └─────────────────────────────────────┘        │
│                                                 │
│ Folder (Optional):                              │
│ ┌─────────────────────────────────────┐        │
│ │ folien-sam                          │        │
│ └─────────────────────────────────────┘        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**KEY POINT**: Make sure **"Unsigned"** is selected!

---

### Step 5: Optional Settings (Recommended)

Scroll down in the same form and add these:

```
Max file size (bytes):
┌─────────────────┐
│ 10485760        │ ← This is 10MB
└─────────────────┘

Allowed formats:
┌─────────────────┐
│ jpg,png,gif,webp│
└─────────────────┘
```

---

### Step 6: Save
Scroll to the bottom and click the blue **"Save"** button

---

### Step 7: Verify
After saving, you should see your preset in the list:

```
Upload Presets:
┌──────────────────────────────────────────┐
│ folien_sam_uploads                       │
│ Signing Mode: Unsigned                   │
│ Created: Just now                        │
└──────────────────────────────────────────┘
```

---

### Step 8: Update Your Code

Make sure your code has:
```typescript
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads';
```

---

### Step 9: Test Upload

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Go to admin panel

3. Upload an image

4. Check browser console (F12) - should see:
   ```
   ✅ Upload successful!
   ```

---

## 🎓 Visual Checklist

When creating the preset, make sure:

- [ ] Preset name is: `folien_sam_uploads`
- [ ] **Signing Mode is: "Unsigned"** ⚠️ MOST IMPORTANT!
- [ ] Clicked "Save" button
- [ ] Preset appears in the list
- [ ] Code has matching preset name

---

## 🆘 Still Getting Error?

### Check These:

1. **Preset Name Match**
   - In Cloudinary: `folien_sam_uploads`
   - In Code: `folien_sam_uploads`
   - Must match exactly (case-sensitive)

2. **Signing Mode**
   - Must be **"Unsigned"**
   - If it says "Signed", edit it and change to "Unsigned"

3. **Saved?**
   - Click the "Save" button at bottom of form
   - Wait for confirmation

4. **Refreshed?**
   - Hard refresh browser (Ctrl+Shift+R)
   - Or restart dev server

---

## 📸 What You Should See

### In Cloudinary Dashboard:
```
Upload Presets:
┌────────────────────────────────────────────────┐
│ Name              | Signing Mode | Created    │
├────────────────────────────────────────────────┤
│ folien_sam_uploads| Unsigned     | Just now   │
└────────────────────────────────────────────────┘
```

### In Browser Console (after upload):
```
📤 Uploading to Cloudinary...
Cloud Name: dm2hybs2u
Upload Preset: folien_sam_uploads
Uploading to: https://api.cloudinary.com/v1_1/dm2hybs2u/image/upload
✅ Upload successful! https://res.cloudinary.com/dm2hybs2u/image/upload/v1234567890/abc123.jpg
```

---

## 🎯 Summary

The error means:
- Your preset exists ✅
- But it's set to "Signed" mode ❌
- Change it to "Unsigned" mode ✅

**Key Point**: Frontend browsers can ONLY use "Unsigned" presets!

---

## 🔗 Quick Links

- Upload Settings: https://console.cloudinary.com/settings/upload
- Media Library: https://console.cloudinary.com/console/media_library
- Documentation: https://cloudinary.com/documentation/upload_presets

---

**Remember**: Always use "Unsigned" for frontend uploads! 🎉

