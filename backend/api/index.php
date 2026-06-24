<?php
require_once __DIR__ . "/../db/connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET' && isset($_GET['id'])){
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id' => $_GET['id']]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}

if($method == 'GET' && !isset($_GET['id'])){
    $stmt = $conn->query("SELECT * FROM users");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if($method == 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email) VALUES(:fname, :lname, :email)");
    $stmt->execute([
        'fname' => $data['firstname'],
        'lname' => $data['lastname'],
        'email' => $data['email']
    ]);
    echo json_encode(["message" => "User created"]);
}