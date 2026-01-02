# 📁 File Upload to Folder - Complete Guide

## 🎉 Problem Solved!

Your images are now saved to a **folder** (`public/uploads/`) instead of localStorage, eliminating the "Storage quota exceeded" error!

---

## 🚀 How to Use

### Step 1: Start the Upload Server

Open a **new terminal** and run:
```bash
npm run server
```

You should see:
```
✅ Upload server running on http://localhost:3001
📁 Uploads directory: /path/to/FolienSam/public/uploads
```

**Keep this terminal running!**

### Step 2: Start the Frontend (in another terminal)

Open a **second terminal** and run:
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜ Local: http://localhost:5173/
```

### Step 3: Use the Admin Panel

1. Go to: `http://localhost:5173/admin`
2. Login with your password
3. Upload images as normal!

---

## 💾 How It Works

### Before (localStorage)
```
User uploads image → Converted to base64 → 
Stored in browser localStorage (5-10MB limit) → 
"Storage quota exceeded" error ❌
```

### After (File System)
```
User uploads image → Sent to server → 
Saved to public/uploads/ folder → 
Returns URL to access image → 
No storage limits! ✅
```

---

## 📁 Where Are Images Stored?

Images are saved to:
```
/Users/coodai/Documents/FolienSam/public/uploads/
```

### File Naming Format:
```
original-name-1234567890-987654321.jpg
                ↑           ↑
            timestamp   random number
```

Example: `hero-bg-1704123456-123456789.jpg`

---

## 🎯 Features

### Automatic Fallback
- ✅ If upload server is running → Saves to folder
- ⚠️ If upload server is NOT running → Falls back to localStorage
- 💡 Always start the upload server first!

### Increased Limits
- **Before**: 5MB max, limited by browser storage
- **After**: 10MB max per file, unlimited total storage

### File Management
- ✅ List all uploaded files
- ✅ Delete files via API
- ✅ Automatic unique naming
- ✅ Type validation (JPG, PNG, GIF, WebP)

---

## 🔧 Server API Endpoints

Your upload server provides these endpoints:

### 1. Upload Image
```
POST http://localhost:3001/api/upload
Body: FormData with 'image' file
Returns: { url, filename, size }
```

### 2. List Uploaded Files
```
GET http://localhost:3001/api/uploads
Returns: Array of uploaded files
```

### 3. Delete File
```
DELETE http://localhost:3001/api/upload/:filename
Returns: { success: true }
```

### 4. Health Check
```
GET http://localhost:3001/api/health
Returns: { status: 'ok' }
```

---

## 📋 File Structure

```
FolienSam/
├── server.js                    # Upload server (NEW!)
├── public/
│   └── uploads/                 # Images stored here (NEW!)
│       ├── .gitkeep
│       ├── hero-bg-...jpg
│       ├── gallery-...png
│       └── service-...webp
├── src/
│   └── services/
│       └── imageUploadService.ts # Updated with server support
└── package.json                 # Added "server" script
```

---

## 🎨 Admin Panel Usage

### Upload Flow:

1. **Click Upload Button**
   - Choose image from computer
   
2. **Automatic Processing**
   - File is validated
   - Sent to upload server
   - Saved to `public/uploads/`
   - URL returned automatically
   
3. **Display**
   - Image URL is used immediately
   - No storage quota issues!

### Example URLs:
```
Before: data:image/jpeg;base64,/9j/4AAQSkZJRg... (very long)
After:  http://localhost:3001/uploads/hero-1704123456-123.jpg
```

---

## 🔄 Running Both Servers

### Option 1: Two Terminals (Recommended)

**Terminal 1 - Upload Server:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: One Command (Advanced)

Install concurrently:
```bash
npm install --save-dev concurrently
```

Update `package.json`:
```json
"scripts": {
  "dev:all": "concurrently \"npm run server\" \"npm run dev\"",
}
```

Then run:
```bash
npm run dev:all
```

---

## 🐛 Troubleshooting

### Issue: "Upload server not available"

**Solution:**
1. Check if upload server is running
2. Run `npm run server` in a separate terminal
3. Verify you see "Upload server running"

### Issue: "EADDRINUSE: address already in use"

**Solution:**
Port 3001 is already used. Either:
- Kill the existing process
- Change port in `server.js` (line 5)

**Kill process on macOS/Linux:**
```bash
lsof -ti:3001 | xargs kill -9
```

### Issue: Images don't load after restart

**Solution:**
Make sure upload server is running when viewing images.

### Issue: "Permission denied" creating folder

**Solution:**
```bash
sudo mkdir -p public/uploads
sudo chmod 755 public/uploads
```

---

## 💡 Pro Tips

### 1. Development Workflow
```bash
# Start both servers every time you develop:
Terminal 1: npm run server
Terminal 2: npm run dev
```

### 2. Check Uploaded Files
```bash
ls -lh public/uploads/
# Shows all uploaded files with sizes
```

### 3. Clear All Uploads (if needed)
```bash
rm -rf public/uploads/*
# Keeps .gitkeep file
```

### 4. Monitor Upload Folder Size
```bash
du -sh public/uploads/
# Shows total folder size
```

---

## 🚀 Production Deployment

For production, consider:

### Option 1: Same Server
- Deploy server.js alongside your frontend
- Use environment variables for URLs
- Set up proper file permissions

### Option 2: Cloud Storage
- AWS S3
- Cloudinary
- Google Cloud Storage
- Azure Blob Storage

### Production-Ready server.js:
```javascript
const PORT = process.env.PORT || 3001;
const UPLOAD_URL = process.env.UPLOAD_URL || 'http://localhost:3001';
```

---

## 📊 Storage Comparison

| Method | Max Size | Total Limit | Speed | Persistence |
|--------|----------|-------------|-------|-------------|
| **localStorage** | 5MB | ~10MB | Instant | Browser only |
| **File Upload** | 10MB | Unlimited* | Fast | Server disk |

*Limited by server disk space

---

## 🔒 Security Considerations

### Current Implementation:
- ✅ File type validation
- ✅ File size limits
- ✅ Unique filenames
- ⚠️ No authentication on upload endpoint
- ⚠️ Files publicly accessible

### For Production:
1. **Add authentication**
   ```javascript
   // Verify admin token before upload
   if (!req.headers.authorization) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

2. **Add rate limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Scan for malware**
   ```bash
   npm install clamscan
   ```

4. **Add HTTPS**
   - Use SSL certificates
   - Encrypt file transfers

---

## 🎓 Example: Upload from Code

```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Uploaded!', data.url);
  return data.url;
};
```

---

## 📝 Testing Checklist

- [ ] Start upload server (`npm run server`)
- [ ] Start frontend (`npm run dev`)
- [ ] Login to admin
- [ ] Upload image in Hero section
- [ ] Check `public/uploads/` folder
- [ ] Verify image displays
- [ ] Upload another image
- [ ] Restart both servers
- [ ] Verify images still work

---

## 🎉 Benefits Summary

✅ **No more storage quota errors**  
✅ **Larger file sizes (10MB vs 5MB)**  
✅ **Unlimited total storage**  
✅ **Better performance**  
✅ **Standard file URLs**  
✅ **Easy to backup (just copy folder)**  
✅ **Works across all browsers**  

---

## 📞 Quick Reference

### Start Servers:
```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

### Access:
- Admin: `http://localhost:5173/admin`
- Upload Server: `http://localhost:3001`
- Uploads Folder: `public/uploads/`

### Check Files:
```bash
ls public/uploads/
```

### Clear All:
```bash
rm public/uploads/*
```

---

## 🎯 Next Steps

1. ✅ Start upload server
2. ✅ Upload your images
3. ✅ Verify they're saved to folder
4. ✅ Check folder size periodically
5. ✅ Backup folder regularly

---

**Problem Solved!** No more "Storage quota exceeded" errors! 🎉

**Questions?** Check the troubleshooting section or review `server.js` code.

