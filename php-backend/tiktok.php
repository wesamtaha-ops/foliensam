<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('DATA_DIR', __DIR__ . '/uploads/data/');
define('TIKTOK_TOKEN_URL', 'https://open.tiktokapis.com/v2/oauth/token/');
define('TIKTOK_VIDEO_LIST_URL', 'https://open.tiktokapis.com/v2/video/list/');
define('TIKTOK_AUTH_URL', 'https://www.tiktok.com/v2/auth/authorize/');

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit();
}

function sendSuccess($data) {
    echo json_encode(['success' => true, 'data' => $data]);
    exit();
}

function getSettings() {
    $settingsFile = DATA_DIR . 'settings.json';

    if (!file_exists($settingsFile)) {
        return [];
    }

    $content = file_get_contents($settingsFile);
    return json_decode($content, true) ?: [];
}

function saveSettings($settings) {
    $settingsFile = DATA_DIR . 'settings.json';
    file_put_contents($settingsFile, json_encode($settings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function getTikTokConfig() {
    $settings = getSettings();

    return [
        'clientKey' => $settings['tiktokClientKey'] ?? '',
        'clientSecret' => $settings['tiktokClientSecret'] ?? '',
        'redirectUri' => $settings['tiktokRedirectUri'] ?? 'https://files.foliensam.de/tiktok.php?action=callback',
        'accessToken' => $settings['tiktokAccessToken'] ?? '',
        'refreshToken' => $settings['tiktokRefreshToken'] ?? '',
        'tokenExpiresAt' => $settings['tiktokTokenExpiresAt'] ?? 0,
        'openId' => $settings['tiktokOpenId'] ?? '',
        'profileUrl' => $settings['tiktokProfileUrl'] ?? 'https://www.tiktok.com/@samautofolierung/',
    ];
}

function tiktokApiRequest($url, $method = 'GET', $headers = [], $body = null) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        if ($body !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        }
    }

    if (!empty($headers)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        return ['error' => 'cURL error: ' . $curlError, 'httpCode' => 500];
    }

    $data = json_decode($response, true);

    return [
        'data' => $data,
        'httpCode' => $httpCode,
        'raw' => $response
    ];
}

function exchangeCodeForTokens($clientKey, $clientSecret, $code, $redirectUri) {
    $postData = http_build_query([
        'client_key' => $clientKey,
        'client_secret' => $clientSecret,
        'code' => $code,
        'grant_type' => 'authorization_code',
        'redirect_uri' => $redirectUri,
    ]);

    return tiktokApiRequest(
        TIKTOK_TOKEN_URL,
        'POST',
        ['Content-Type: application/x-www-form-urlencoded'],
        $postData
    );
}

function refreshAccessToken($clientKey, $clientSecret, $refreshToken) {
    $postData = http_build_query([
        'client_key' => $clientKey,
        'client_secret' => $clientSecret,
        'grant_type' => 'refresh_token',
        'refresh_token' => $refreshToken,
    ]);

    return tiktokApiRequest(
        TIKTOK_TOKEN_URL,
        'POST',
        ['Content-Type: application/x-www-form-urlencoded'],
        $postData
    );
}

function storeTokens($tokenData) {
    $settings = getSettings();

    $settings['tiktokAccessToken'] = $tokenData['access_token'];
    $settings['tiktokRefreshToken'] = $tokenData['refresh_token'];
    $settings['tiktokOpenId'] = $tokenData['open_id'] ?? ($settings['tiktokOpenId'] ?? '');
    $settings['tiktokTokenExpiresAt'] = time() + intval($tokenData['expires_in'] ?? 86400);

    saveSettings($settings);

    return $settings;
}

function getValidAccessToken() {
    $config = getTikTokConfig();

    if (empty($config['clientKey']) || empty($config['clientSecret'])) {
        sendError('TikTok API credentials not configured. Add them in Admin Settings.');
    }

    if (empty($config['refreshToken']) && empty($config['accessToken'])) {
        sendError('TikTok account not connected. Connect your account in Admin Settings.');
    }

    $needsRefresh = empty($config['accessToken']) ||
        ($config['tokenExpiresAt'] > 0 && time() >= ($config['tokenExpiresAt'] - 300));

    if ($needsRefresh) {
        if (empty($config['refreshToken'])) {
            sendError('TikTok access token expired. Please reconnect your account in Admin Settings.');
        }

        $result = refreshAccessToken($config['clientKey'], $config['clientSecret'], $config['refreshToken']);

        if ($result['httpCode'] !== 200 || isset($result['data']['error'])) {
            $errorMsg = $result['data']['error_description'] ?? $result['data']['error'] ?? 'Failed to refresh TikTok token';
            sendError('TikTok token refresh failed: ' . $errorMsg . '. Please reconnect your account.');
        }

        storeTokens($result['data']);
        return $result['data']['access_token'];
    }

    return $config['accessToken'];
}

function fetchTikTokVideos($maxCount = 20, $cursor = null) {
    $accessToken = getValidAccessToken();

    $fields = 'id,title,cover_image_url,share_url,video_description,duration,create_time,embed_link,view_count,like_count';
    $url = TIKTOK_VIDEO_LIST_URL . '?' . http_build_query(['fields' => $fields]);

    $body = json_encode([
        'max_count' => min(intval($maxCount), 20),
        'cursor' => $cursor ? intval($cursor) : null,
    ]);

    $result = tiktokApiRequest(
        $url,
        'POST',
        [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
        ],
        $body
    );

    if ($result['httpCode'] !== 200) {
        $errorMsg = $result['data']['error']['message'] ?? $result['data']['error_description'] ?? 'Unknown TikTok API error';
        sendError('TikTok API error: ' . $errorMsg, $result['httpCode']);
    }

    if (isset($result['data']['error']) && !empty($result['data']['error']['code'])) {
        $errorMsg = $result['data']['error']['message'] ?? 'TikTok API error';
        sendError('TikTok API error: ' . $errorMsg);
    }

    $videos = [];
    $apiVideos = $result['data']['data']['videos'] ?? [];

    foreach ($apiVideos as $video) {
        $videos[] = [
            'id' => $video['id'],
            'title' => $video['title'] ?? $video['video_description'] ?? 'TikTok Video',
            'description' => $video['video_description'] ?? '',
            'thumbnail' => $video['cover_image_url'] ?? '',
            'shareUrl' => $video['share_url'] ?? '',
            'embedLink' => $video['embed_link'] ?? '',
            'duration' => $video['duration'] ?? 0,
            'viewCount' => $video['view_count'] ?? 0,
            'likeCount' => $video['like_count'] ?? 0,
            'publishedAt' => isset($video['create_time'])
                ? date('c', intval($video['create_time']))
                : date('c'),
        ];
    }

    return [
        'videos' => $videos,
        'cursor' => $result['data']['data']['cursor'] ?? null,
        'hasMore' => $result['data']['data']['has_more'] ?? false,
    ];
}

$action = $_GET['action'] ?? 'videos';

switch ($action) {
    case 'auth_url':
        $config = getTikTokConfig();

        if (empty($config['clientKey'])) {
            sendError('TikTok Client Key not configured.');
        }

        $state = bin2hex(random_bytes(16));
        $settings = getSettings();
        $settings['tiktokOAuthState'] = $state;
        saveSettings($settings);

        $authUrl = TIKTOK_AUTH_URL . '?' . http_build_query([
            'client_key' => $config['clientKey'],
            'scope' => 'user.info.basic,video.list',
            'response_type' => 'code',
            'redirect_uri' => $config['redirectUri'],
            'state' => $state,
        ]);

        sendSuccess(['authUrl' => $authUrl]);
        break;

    case 'callback':
        $code = $_GET['code'] ?? '';
        $state = $_GET['state'] ?? '';
        $settings = getSettings();
        $config = getTikTokConfig();

        if (empty($code)) {
            header('Location: https://www.foliensam.de/admin?tiktok=error&message=' . urlencode('Authorization denied'));
            exit();
        }

        if (empty($settings['tiktokOAuthState']) || $state !== $settings['tiktokOAuthState']) {
            header('Location: https://www.foliensam.de/admin?tiktok=error&message=' . urlencode('Invalid OAuth state'));
            exit();
        }

        $result = exchangeCodeForTokens(
            $config['clientKey'],
            $config['clientSecret'],
            $code,
            $config['redirectUri']
        );

        if ($result['httpCode'] !== 200 || isset($result['data']['error'])) {
            $errorMsg = $result['data']['error_description'] ?? $result['data']['error'] ?? 'Token exchange failed';
            header('Location: https://www.foliensam.de/admin?tiktok=error&message=' . urlencode($errorMsg));
            exit();
        }

        storeTokens($result['data']);
        unset($settings['tiktokOAuthState']);
        saveSettings($settings);

        header('Location: https://www.foliensam.de/admin?tiktok=connected');
        exit();
        break;

    case 'status':
        $config = getTikTokConfig();
        sendSuccess([
            'connected' => !empty($config['accessToken']) || !empty($config['refreshToken']),
            'openId' => $config['openId'],
            'profileUrl' => $config['profileUrl'],
            'tokenExpiresAt' => $config['tokenExpiresAt'],
        ]);
        break;

    case 'disconnect':
        $settings = getSettings();
        unset(
            $settings['tiktokAccessToken'],
            $settings['tiktokRefreshToken'],
            $settings['tiktokTokenExpiresAt'],
            $settings['tiktokOpenId'],
            $settings['tiktokOAuthState']
        );
        saveSettings($settings);
        sendSuccess(['disconnected' => true]);
        break;

    case 'videos':
    default:
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            sendError('Invalid request method', 405);
        }

        $maxCount = isset($_GET['maxCount']) ? intval($_GET['maxCount']) : 20;
        $cursor = isset($_GET['cursor']) ? $_GET['cursor'] : null;

        $data = fetchTikTokVideos($maxCount, $cursor);
        sendSuccess($data);
        break;
}
