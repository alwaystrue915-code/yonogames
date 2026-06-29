<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$API_KEY = "yonogames-v2";
$MAX_SIZE = 10 * 1024 * 1024;
$BASE_URL = "https://app.nexapk.in/uploads/";
$UPLOAD_DIR = __DIR__ . "/uploads/";

function response($code, $data) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    response(405, ["success" => false, "error" => "Method not allowed"]);
}

// URL-based upload
if (isset($_POST["url"]) && filter_var($_POST["url"], FILTER_VALIDATE_URL)) {
    if (!isset($_POST["key"]) || !hash_equals($API_KEY, $_POST["key"])) {
        response(401, ["success" => false, "error" => "Unauthorized"]);
    }
    $ch = curl_init($_POST["url"]);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_USERAGENT => "Mozilla/5.0 (compatible; YonoUpload/1.0)"
    ]);
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);

    if ($httpCode !== 200 || !$data) {
        response(400, ["success" => false, "error" => "Failed to fetch URL"]);
    }

    $tmpPath = tempnam(sys_get_temp_dir(), "upl_");
    file_put_contents($tmpPath, $data);

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $tmpPath);
    finfo_close($finfo);
    $_FILES["image"] = ["tmp_name" => $tmpPath, "size" => strlen($data), "error" => UPLOAD_ERR_OK];
    // fall through to file processing below
} else {
    if (!isset($_POST["key"]) || !hash_equals($API_KEY, $_POST["key"])) {
        response(401, ["success" => false, "error" => "Unauthorized"]);
    }
    if (!isset($_FILES["image"])) {
        response(400, ["success" => false, "error" => "No image uploaded"]);
    }
}

$file = $_FILES["image"];

if ($file["error"] !== UPLOAD_ERR_OK) {
    @unlink($tmpPath ?? "");
    response(400, ["success" => false, "error" => "Upload error"]);
}

if ($file["size"] <= 0 || $file["size"] > $MAX_SIZE) {
    @unlink($tmpPath ?? "");
    response(400, ["success" => false, "error" => "Max file size 10MB"]);
}

$tmpPath = $file["tmp_name"];

if (!is_uploaded_file($tmpPath) && !isset($_POST["url"])) {
    @unlink($tmpPath ?? "");
    response(400, ["success" => false, "error" => "Invalid upload"]);
}

$allowedMime = [
    "image/jpeg" => "jpg",
    "image/png"  => "png",
    "image/webp" => "webp",
    "image/gif"  => "gif"
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $tmpPath);
finfo_close($finfo);

if (!isset($allowedMime[$mime])) {
    @unlink($tmpPath ?? "");
    response(400, ["success" => false, "error" => "Only JPG PNG WEBP GIF allowed"]);
}

$imageInfo = getimagesize($tmpPath);
if ($imageInfo === false) {
    @unlink($tmpPath ?? "");
    response(400, ["success" => false, "error" => "Invalid image file"]);
}

if (!is_dir($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}

$ext = $allowedMime[$mime];
$fileName = date("Ymd_His") . "_" . bin2hex(random_bytes(12)) . "." . $ext;
$target = $UPLOAD_DIR . $fileName;

if (!move_uploaded_file($tmpPath, $target)) {
    @unlink($tmpPath ?? "");
    response(500, ["success" => false, "error" => "File save failed"]);
}

chmod($target, 0644);

response(200, [
    "success" => true,
    "url" => $BASE_URL . $fileName,
    "filename" => $fileName,
    "size" => $file["size"],
    "mime" => $mime
]);
