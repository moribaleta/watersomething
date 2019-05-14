<?php

function OpenCon()
{
    $dbhost = "sql107.epizy.com";
    $dbuser = "epiz_23898690";
    $dbpass = "vKl9KoxcMe";
    $db = "epiz_23898690_basic_database";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n" . $conn->error);

    return $conn;
}

function CloseCon($conn)
{
    $conn->close();
}

/* function OpenCon(){
$servername = "localhost";
$username = "root";
$password = "";
$db = 'basic_database';

$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
return $conn;
} */

// Create connection

/* function CloseCon($conn){
$conn -> close();
}  */
