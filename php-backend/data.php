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

