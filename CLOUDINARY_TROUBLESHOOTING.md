# 🔧 Cloudinary Troubleshooting Guide

## Common Issue: "Storage quota exceeded" Error

If you're seeing this error, it means Cloudinary upload is failing and the code tried to fall back to localStorage (which is now full).

---

## ✅ Step-by-Step Fix

### 1. Verify Upload Preset is "Unsigned"

This is the **#1 most common issue**!

1. Go to: https://console.cloudinary.com/settings/upload
2. Find your preset: `folien_sam_uploads`
3. **Check the "Signing Mode"**
   - ✅ Should be: **"Unsigned"**
   - ❌ If it says "Signed", change it to "Unsigned"

**Why?** Frontend browsers can only use "Unsigned" presets. "Signed" presets require your API secret (which should never be in frontend code).

### 2. Verify Cloud Name

In `imageUploadService.ts`:
```typescript
const CLOUDINARY_CLOUD_NAME = 'dm2hybs2u'; // ✅ This looks correct
```

### 3. Check Browser Console

1. Open your browser (Chrome/Firefox)
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Try uploading an image
5. Look for error messages

You should see:
```
📤 Uploading to Cloudinary...
Cloud Name: dm2hybs2u
Upload Preset: folien_sam_uploads
Uploading to: https://api.cloudinary.com/v1_1/dm2hybs2u/image/upload
✅ Upload successful! https://res.cloudinary.com/...
```

If you see an error instead, it will tell you what's wrong.

---

## 🔍 Common Errors & Solutions

### Error: "Invalid upload preset"

**Cause**: Upload preset doesn't exist or name is wrong

**Fix**:
1. Go to: https://console.cloudinary.com/settings/upload
2. Click "Add upload preset"
3. Name it exactly: `folien_sam_uploads`
4. Set Signing Mode: **Unsigned**
5. Click Save

### Error: "Upload must be signed"

**Cause**: Your upload preset is set to "Signed" mode

**Fix**:
1. Go to: https://console.cloudinary.com/settings/upload
2. Click on your preset: `folien_sam_uploads`
3. Change "Signing Mode" from "Signed" to **"Unsigned"**
4. Click Save

### Error: "CORS error" or "Network error"

**Cause**: Browser blocking the request

**Fix**:
1. Make sure you're using `https://` not `http://`
2. Check your internet connection
3. Try a different browser
4. Disable browser extensions temporarily

### Error: "File too large"

**Cause**: File exceeds size limit

**Fix**:
1. Check file size (should be under 10MB)
2. Compress image before upload
3. Or increase limit in Cloudinary preset

---

## 🎯 Quick Test

### Test in Browser Console

1. Open your website
2. Press `F12`
3. Go to Console tab
4. Paste this code:

```javascript
// Test Cloudinary upload
const testUpload = async () => {
  const response = await fetch('https://api.cloudinary.com/v1_1/dm2hybs2u/image/upload', {
    method: 'POST',
    body: new FormData() // empty test
  });
  console.log('Status:', response.status);
  const data = await response.json();
  console.log('Response:', data);
};
testUpload();
```

**Expected**: Should return an error about missing file, but confirms the endpoint is accessible.

---

## 📋 Checklist

Before uploading, verify:

- [ ] Cloud name is correct: `dm2hybs2u`
- [ ] Upload preset exists: `folien_sam_uploads`
- [ ] Upload preset is set to **"Unsigned"**
- [ ] Browser console is open (F12)
- [ ] Internet connection is working
- [ ] File is under 10MB
- [ ] File is valid image type (JPG, PNG, GIF, WebP)

---

## 🔄 Create New Upload Preset (If Needed)

If your current preset has issues, create a new one:

### Step 1: Go to Upload Settings
https://console.cloudinary.com/settings/upload

### Step 2: Click "Add upload preset"

### Step 3: Configure:
```
Preset name: folien_sam_uploads
Signing Mode: Unsigned ⚠️ IMPORTANT!
Folder: (optional) folien-sam
```

### Step 4: Advanced Settings (optional):
```
✅ Max file size: 10485760 (10MB)
✅ Allowed formats: jpg,png,gif,webp
✅ Resource type: image
✅ Access mode: public
```

### Step 5: Save

### Step 6: Copy the preset name to your code

---

## 🧪 Test with Postman/Curl

Test the API directly:

```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/dm2hybs2u/image/upload \
  -F 'upload_preset=folien_sam_uploads' \
  -F 'file=@/path/to/test-image.jpg'
```

Expected: JSON response with `secure_url`

---

## 📞 Still Not Working?

### Check These:

1. **Upload preset name** - Must match exactly (case-sensitive)
2. **Signing mode** - Must be "Unsigned"
3. **Cloud name** - Must be correct
4. **Browser console** - Check for detailed errors
5. **Network tab** - See the actual API request/response

### Get More Help:

1. **Cloudinary Support**: https://support.cloudinary.com/
2. **Browser Console**: Shows detailed error messages
3. **Network Tab**: Shows API request details

---

## ✅ Verification Steps

### 1. Check Cloudinary Dashboard

Go to: https://console.cloudinary.com/console/c-a2d450cce97c1e6f7b27a28e80ba43/getting-started

Verify:
- Account is active
- No errors or warnings
- Free tier has space available

### 2. Test Upload via Admin Panel

1. Run: `npm run dev`
2. Go to: `http://localhost:5173/admin`
3. Try uploading a small image (under 1MB)
4. Check browser console for logs

### 3. Verify Upload Worked

After successful upload:
1. Check browser console for URL
2. Copy the URL and open in new tab
3. Should see your image
4. Check Cloudinary Media Library: https://console.cloudinary.com/console/c-a2d450cce97c1e6f7b27a28e80ba43/media_library

---

## 💡 Pro Tips

### Clear Browser Cache
Sometimes old code is cached:
- Press `Ctrl+Shift+R` (Windows/Linux)
- Press `Cmd+Shift+R` (Mac)

### Try Incognito Mode
Test in a private/incognito window to rule out extensions

### Check File Size
Before uploading:
```javascript
console.log('File size:', file.size / 1024 / 1024, 'MB');
```

---

## 🎓 Video Tutorial

Watch Cloudinary's official setup guide:
https://cloudinary.com/documentation/upload_images#unsigned_upload

---

**Most Common Fix**: Set your upload preset to "Unsigned" mode! ⚡

