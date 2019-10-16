<?php
include "conn.php";
$conn->query('SET NAMES UTF8');

if(isset($_GET['id'])){
    $id=$_GET['id'];
    $result=$conn->query("select * from indexpic where sid=$id");
    echo json_encode($result->fetch_assoc());
}