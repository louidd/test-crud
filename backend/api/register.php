<?php
require_once __DIR__ . "/../db/connection.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

// Check if username already exists
$check = $conn->prepare("SELECT * FROM login WHERE username = :username");
$check->execute(['username' => $username]);
if($check->fetch()){
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO login (username, password) VALUES(:username, :password)");
$stmt->execute(['username' => $username, 'password' => $password]);
echo json_encode(["success" => true, "message" => "Account created"]);