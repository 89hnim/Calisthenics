<?php
	include('../config/configDb.php');
	include('object/user.php');
	include('../config/core.php');

	if(isset($_POST["userName"]) && isset($_POST["account"]) && isset($_POST["password"]))
	{
		$userName = $_POST["userName"];
		$account = $_POST["account"];
		$password = $_POST["password"];
		$type = 2;
		$hash_pass = password_hash($password, PASSWORD_DEFAULT);

		$stmt = $conn->prepare("SELECT * FROM user WHERE Account = :account");
		$stmt->bindParam(':account', $account);
   		$stmt ->execute();
   		$num = $stmt ->rowCount();

   		if( $num > 0){
   			echo 'existAccount';
   		}
   		else{
			$insert = $conn->prepare("INSERT INTO user(Account, Pass, Username, Type) VALUES(:account, :password, :userName, :type)");
	        $insert->bindParam(':userName', $userName);
	        $insert->bindParam(':account', $account);
	        $insert->bindParam(':password', $hash_pass);
	        $insert->bindParam(':type', $type);
	        $insert->execute();

	        echo('xong');
            $_SESSION['signup_success'] = true;
	        
   		}

	}

?>