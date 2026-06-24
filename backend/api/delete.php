<?php
require_once __DIR__ . "/../db/connection.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ← this must come FIRST before anything else
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("DELETE FROM users WHERE id = :id");
$stmt->execute(['id' => $data['id']]);
echo json_encode(["message" => "User deleted"]);