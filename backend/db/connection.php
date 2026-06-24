<?php
$host = 'localhost';
$dbname = 'react_crud';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=react-crud", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

