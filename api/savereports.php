<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
include 'access.php';

$data             = $_POST['data'];
$user                 = $_POST['user'];
$conn = OpenCon();

$sql = `INSERT INTO reports(user,data) values($user,$data)`;
//$sql = "INSERT INTO `reports`(`user`,`data`, `DAY`,`DATE`, `MONTH`,`YEAR`, `CAUSE`, `ALERT_LEVEL`,  `ESTABLISHMENT`, `DISTRICT`,`LATITUDE`,`LONGITUDE`,`AMOUNT_OF_DAMAGE`,`COMPLETE_ADDRESS`,`FATALITY`,`INJURED`) VALUES ($id,'$time','$day','$date','$month',$year,'$cause','$alarm','$establishment_type','$district','$latitude','$longitude','$amount_damage','$complete_address','$fatality','$injured')";

if ($conn->query($sql) === TRUE) {
    print "New record created successfully";
} else {
    print "Error: " . $sql . "<br>" . $conn->error;
}
CloseCon($conn);
?>
