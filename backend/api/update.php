<?php
require_once __DIR__ . "/../db/connection.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Only run on POST
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("UPDATE users SET firstname=:fname, lastname=:lname, email=:email WHERE id=:id");
$stmt->execute([
    'fname' => $data['firstname'],
    'lname' => $data['lastname'],
    'email' => $data['email'],
    'id'    => $data['id']
]);
echo json_encode(["message" => "User updated"]);