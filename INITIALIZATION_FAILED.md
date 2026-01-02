# ❌ Initialization Failed - Troubleshooting

## What Happened

You clicked "Initialize" but the JSON files weren't created in Cloudinary (still getting 404 errors).

---

## 🔍 Most Common Cause

**Your Cloudinary upload preset doesn't allow raw file uploads.**

The preset `folien_sam_uploads` needs to be configured to accept:
- ✅ Image uploads
- ✅ **Raw file uploads** (JSON files)

---

## ✅ Solution: Configure Cloudinary Preset

### Step 1: Go to Cloudinary Dashboard

1. Open: https://console.cloudinary.com/
2. Login to your account

### Step 2: Check Upload Preset Settings

1. Click **Settings** (gear icon) in the top right
2. Click **Upload** tab
3. Scroll to **Upload presets** section
4. Find `folien_sam_uploads`

### Step 3: Enable Raw File Uploads

Click **Edit** on your preset, then check:

**Signing Mode:**
- ✅ Must be set to **"Unsigned"**

**Allowed Formats:**
- ✅ Should include `json` or be empty (allows all)

**Resource Types:**
- ✅ Should allow **"raw"** uploads
- Some presets only allow images - this won't work for JSON!

### Step 4: Save Changes

Click **Save** at the bottom of the page.

---

## 🔄 Alternative Solution: Create New Preset

If the preset is too restricted, create a new one:

### 1. Create New Unsigned Preset

1. Go to Settings → Upload → Upload presets
2. Click **Add upload preset**
3. Fill in:
   - **Preset name**: `folien_sam_data`
   - **Signing mode**: **Unsigned**
   - **Use filename**: ✅ Checked
   - **Unique filename**: ✅ Checked
   - **Allowed formats**: Leave empty (allows all) or add `json`
   - **Resource types**: Make sure **raw** is allowed

4. Click **Save**

### 2. Update Your Code

Open: `src/services/cloudinaryDataService.ts`

Change line 5:
```typescript
const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_data'; // Your new preset
```

---

## 🧪 Test the Fix

### Option 1: Browser Console Test

Open browser console (F12) and paste:

```javascript
// Test JSON upload
const testUpload = async () => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify({ test: true })], { type: 'application/json' });
  formData.append('file', blob, 'test.json');
  formData.append('upload_preset', 'folien_sam_uploads');
  formData.append('public_id', 'test_upload');
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/dm2hybs2u/raw/upload',
    { method: 'POST', body: formData }
  );
  
  const result = await response.json();
  console.log('Result:', result);
};

testUpload();
```

**Expected result:**
- ✅ `result.secure_url` = URL to uploaded file
- ❌ `error` = Preset issue

### Option 2: Re-run Initialization

1. **Refresh your browser**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Go to: `http://localhost:5174/admin`
3. Login
4. Click **Setup** tab
5. Click **"Initialize Cloudinary Storage"** again
6. **Watch browser console** (F12) for detailed logs

You should see:
```
📤 Uploading JSON to Cloudinary: folien_sam_data/gallery
✅ JSON uploaded to Cloudinary: https://...
   Public ID: folien_sam_data/gallery
```

If you see errors, the console will show what went wrong!

---

## 🔍 Check What Error Occurred

### Open Browser Console (F12)

Look for error messages like:

**Error 1: "Upload preset not found"**
```
❌ Cloudinary upload failed: {error: {message: "Upload preset not found"}}
```
**Fix**: Preset name is wrong or doesn't exist. Check spelling.

**Error 2: "Upload preset must be whitelisted"**
```
❌ Cloudinary upload failed: {error: {message: "Upload preset must be whitelisted for unsigned uploads"}}
```
**Fix**: Change preset's "Signing Mode" to "Unsigned"

**Error 3: "Invalid resource type"**
```
❌ Cloudinary upload failed: {error: {message: "Resource type raw is not allowed"}}
```
**Fix**: Enable raw file uploads in preset settings

**Error 4: "Invalid file type"**
```
❌ Cloudinary upload failed: {error: {message: "File type not allowed"}}
```
**Fix**: Add `json` to allowed formats, or leave empty

---

## 📋 Checklist

Before trying again, verify:

- [ ] Cloudinary account is active
- [ ] Upload preset `folien_sam_uploads` exists
- [ ] Preset "Signing Mode" = **"Unsigned"**
- [ ] Preset allows **raw** file uploads
- [ ] Preset allows **json** format (or all formats)
- [ ] Cloud name in code = `dm2hybs2u` (matches your account)

---

## 🆘 Quick Fix: Use Default Preset

If nothing works, try using Cloudinary's default unsigned preset:

### Update Code:

Open: `src/services/cloudinaryDataService.ts`

Change line 5 to:
```typescript
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'; // Cloudinary's default
```

**Note**: This should work immediately, but files won't be organized in folders.

---

## 📸 What Should Happen

After successful initialization, check Cloudinary:

1. Go to: https://console.cloudinary.com/
2. Click **Media Library**
3. Filter by: **Raw** (not Images)
4. You should see:
   ```
   folien_sam_data/
   ├── gallery.json
   ├── hero.json
   ├── services.json
   ├── translations.json
   └── settings.json
   ```

If you see these files → ✅ Success!

---

## 🎯 Summary

**Problem**: JSON files not uploading to Cloudinary

**Most Likely Cause**: Upload preset doesn't allow raw files

**Solution**: 
1. Go to Cloudinary → Settings → Upload Presets
2. Edit `folien_sam_uploads`
3. Set to "Unsigned"
4. Allow raw file uploads
5. Save
6. Try initialization again

---

**Need more help?** Check browser console (F12) for detailed error messages!

