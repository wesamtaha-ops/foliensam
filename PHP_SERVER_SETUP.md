# PHP Server Setup Guide

## ✅ Complete PHP Backend Solution

This project now uses **your own PHP server** at `https://files.foliensam.de` for:
- ✅ Image uploads (no size/quota limits!)
- ✅ JSON data storage (gallery, hero, services, translations, settings)
- ✅ No third-party dependencies (no Cloudinary, no APIs)
- ✅ Full control and instant updates

---

## 📁 Upload PHP Files to Your Server

Upload these 2 PHP files to your server at `files.foliensam.de`:

### 1. `upload.php` - Image Upload Handler

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('UPLOAD_DIR', __DIR__ . '/uploads/images/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4']);
define('BASE_URL', 'https://files.foliensam.de');

// Create upload directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}

function sendSuccess($data) {
    echo json_encode(['success' => true, 'data' => $data]);
    exit();
}

// Validate request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Invalid request method', 405);
}

if (!isset($_FILES['file'])) {
    sendError('No file uploaded');
}

$file = $_FILES['file'];

// Validate file
if ($file['error'] !== UPLOAD_ERR_OK) {
    sendError('Upload failed with error code: ' . $file['error']);
}

if ($file['size'] > MAX_FILE_SIZE) {
    sendError('File too large. Maximum size: 10MB');
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, ALLOWED_TYPES)) {
    sendError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4');
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_', true) . '_' . time() . '.' . $extension;
$filepath = UPLOAD_DIR . $filename;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $filepath)) {
    sendError('Failed to save file', 500);
}

// Return file URL
$fileUrl = BASE_URL . '/uploads/images/' . $filename;
sendSuccess([
    'url' => $fileUrl,
    'filename' => $filename,
    'size' => $file['size'],
    'type' => $mimeType
]);
```

### 2. `data.php` - JSON Data Management

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('DATA_DIR', __DIR__ . '/uploads/data/');

// Create data directory if it doesn't exist
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}

function sendSuccess($data) {
    echo json_encode(['success' => true, 'data' => $data]);
    exit();
}

function getFilePath($dataType) {
    $allowedTypes = ['gallery', 'hero', 'services', 'translations', 'settings'];
    if (!in_array($dataType, $allowedTypes)) {
        sendError('Invalid data type');
    }
    return DATA_DIR . $dataType . '.json';
}

// Get request method and data type
$method = $_SERVER['REQUEST_METHOD'];
$dataType = isset($_GET['type']) ? $_GET['type'] : null;

if (!$dataType) {
    sendError('Data type is required');
}

$filepath = getFilePath($dataType);

switch ($method) {
    case 'GET':
        // Read JSON file
        if (!file_exists($filepath)) {
            sendSuccess(null);
        }
        
        $content = file_get_contents($filepath);
        $data = json_decode($content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            sendError('Invalid JSON data in file', 500);
        }
        
        sendSuccess($data);
        break;

    case 'POST':
    case 'PUT':
        // Write JSON file
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            sendError('Invalid JSON in request');
        }
        
        // Pretty print JSON for readability
        $jsonContent = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        
        if (file_put_contents($filepath, $jsonContent) === false) {
            sendError('Failed to save data', 500);
        }
        
        sendSuccess([
            'type' => $dataType,
            'timestamp' => time()
        ]);
        break;

    case 'DELETE':
        // Delete JSON file
        if (file_exists($filepath)) {
            if (!unlink($filepath)) {
                sendError('Failed to delete data', 500);
            }
        }
        
        sendSuccess(['type' => $dataType]);
        break;

    default:
        sendError('Invalid request method', 405);
}
```

---

## 📂 Server Directory Structure

After uploading, your server should have:

```
files.foliensam.de/
├── upload.php              # Image upload handler
├── data.php                # JSON data handler
└── uploads/
    ├── images/             # Uploaded images (auto-created)
    │   ├── img_xxx.jpg
    │   ├── img_yyy.png
    │   └── ...
    └── data/               # JSON data files (auto-created)
        ├── gallery.json
        ├── hero.json
        ├── services.json
        ├── translations.json
        └── settings.json
```

**Note**: The `uploads/` directory and subdirectories will be created automatically by the PHP scripts.

---

## 🚀 How to Initialize

1. **Upload the PHP files** to your server
2. **Go to**: `https://your-site.com/admin`
3. **Login** with the default password: `admin123`
4. **Navigate to** "Setup" tab
5. **Click** "Initialize Storage"
6. **Done!** All JSON files are created on your server

---

## 🔧 How It Works

### Image Uploads:
1. User selects image in admin panel
2. Frontend sends to `https://files.foliensam.de/upload.php`
3. PHP saves to `uploads/images/`
4. Returns public URL like `https://files.foliensam.de/uploads/images/img_123.jpg`

### Data Management:
1. Admin saves changes (e.g., hero section)
2. Frontend sends JSON to `https://files.foliensam.de/data.php?type=hero`
3. PHP saves to `uploads/data/hero.json`
4. All devices read from the same JSON file = instant sync!

---

## ✅ Benefits of PHP Backend

- **No limits**: Upload as many images as you want
- **No caching issues**: Updates are instant
- **Full control**: Your server, your data
- **No API keys needed**: No third-party services
- **Simple**: Just 2 PHP files
- **Reliable**: Direct file system access

---

## 🔒 Security Recommendations

1. **Change Admin Password**: Go to Settings tab in admin panel
2. **Add .htaccess Protection** (optional):

```apache
# Prevent direct access to data directory
<FilesMatch "\.(json)$">
    Order Deny,Allow
    Deny from all
</FilesMatch>

# Allow only your domain to upload
SetEnvIf Origin "https://www.foliensam.de" AccessControlAllowOrigin=$0
Header add Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
```

3. **Add file size limits in PHP**:
   - Already configured to 10MB max per file
   - Adjust `MAX_FILE_SIZE` in `upload.php` if needed

---

## 🐛 Troubleshooting

### Issue: "Failed to upload image"
- **Check**: PHP `upload_max_filesize` and `post_max_size` in `php.ini`
- **Solution**: Increase to at least `10M`

### Issue: "Failed to save data"
- **Check**: Directory permissions
- **Solution**: Set `uploads/` to `0755` or `0777`

### Issue: "CORS error"
- **Check**: Headers in PHP files
- **Solution**: Ensure `Access-Control-Allow-Origin: *` is set

### Issue: "Data not updating"
- **Check**: JSON syntax in admin panel
- **Solution**: Use browser console to see specific errors

---

## 📝 API Endpoints

### Upload Image
```
POST https://files.foliensam.de/upload.php
Content-Type: multipart/form-data
Body: { file: <image file> }

Response:
{
  "success": true,
  "data": {
    "url": "https://files.foliensam.de/uploads/images/img_123.jpg",
    "filename": "img_123.jpg",
    "size": 123456,
    "type": "image/jpeg"
  }
}
```

### Get Data
```
GET https://files.foliensam.de/data.php?type=hero

Response:
{
  "success": true,
  "data": {
    "mainImageUrl": "...",
    "videoUrl": "...",
    "youtubeVideoId": "..."
  }
}
```

### Save Data
```
POST https://files.foliensam.de/data.php?type=hero
Content-Type: application/json
Body: { "mainImageUrl": "...", ... }

Response:
{
  "success": true,
  "data": {
    "type": "hero",
    "timestamp": 1234567890
  }
}
```

---

## 🎉 You're All Set!

Your FolienSam website now runs on **100% your own infrastructure**. No third-party dependencies, no API limits, full control!

