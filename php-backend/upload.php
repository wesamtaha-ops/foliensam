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

