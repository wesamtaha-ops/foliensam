<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('DATA_DIR', __DIR__ . '/uploads/data/');

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}

function sendSuccess($data) {
    echo json_encode(['success' => true, 'data' => $data]);
    exit();
}

// Get YouTube API settings from settings.json
function getYouTubeSettings() {
    $settingsFile = DATA_DIR . 'settings.json';
    
    if (!file_exists($settingsFile)) {
        return [
            'apiKey' => 'AIzaSyD_CSCL18alWYzaYgiL9IJn-TAQ1UaVK9I',
            'channelId' => 'UCSe_xvuLLefPse0WqiBuOAw'
        ];
    }
    
    $content = file_get_contents($settingsFile);
    $settings = json_decode($content, true);
    
    return [
        'apiKey' => $settings['youtubeApiKey'] ?? 'AIzaSyD_CSCL18alWYzaYgiL9IJn-TAQ1UaVK9I',
        'channelId' => $settings['youtubeChannelId'] ?? 'UCSe_xvuLLefPse0WqiBuOAw'
    ];
}

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Invalid request method', 405);
}

// Get parameters
$maxResults = isset($_GET['maxResults']) ? intval($_GET['maxResults']) : 25;
$pageToken = isset($_GET['pageToken']) ? $_GET['pageToken'] : '';

// Get YouTube settings
$settings = getYouTubeSettings();
$apiKey = $settings['apiKey'];
$channelId = $settings['channelId'];

if (empty($apiKey)) {
    sendError('YouTube API key not configured. Please add it in Admin Settings.');
}

// Build YouTube API URL
$apiUrl = 'https://www.googleapis.com/youtube/v3/search?' . http_build_query([
    'key' => $apiKey,
    'channelId' => $channelId,
    'part' => 'snippet,id',
    'order' => 'date',
    'maxResults' => $maxResults,
    'type' => 'video',
    'pageToken' => $pageToken
]);

// Make the API request using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($response === false) {
    sendError('Failed to fetch YouTube data: ' . $curlError, 500);
}

// Handle HTTP errors
if ($httpCode !== 200) {
    $errorData = json_decode($response, true);
    $errorMessage = $errorData['error']['message'] ?? 'Unknown YouTube API error';
    sendError('YouTube API error: ' . $errorMessage, $httpCode);
}

// Parse and return the response
$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    sendError('Invalid JSON response from YouTube API', 500);
}

// Transform the response to match expected format
$videos = [];
if (isset($data['items']) && is_array($data['items'])) {
    foreach ($data['items'] as $item) {
        $videos[] = [
            'id' => $item['id']['videoId'],
            'title' => $item['snippet']['title'],
            'description' => $item['snippet']['description'],
            'thumbnail' => $item['snippet']['thumbnails']['maxresdefault']['url'] ?? 
                          $item['snippet']['thumbnails']['high']['url'] ?? 
                          $item['snippet']['thumbnails']['medium']['url'] ?? '',
            'publishedAt' => $item['snippet']['publishedAt'],
            'isShort' => true
        ];
    }
}

// Return the transformed data
sendSuccess([
    'videos' => $videos,
    'nextPageToken' => $data['nextPageToken'] ?? null
]);

