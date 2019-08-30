	<?php 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

	function response($result, $status = 200, $message = "success") {
		return array(
			"result" => $result,
			"message" => $message,
			"status" => $status,
		);
	}

	try{
		include 'config/db.php';
		$method_name = $_SERVER["REQUEST_METHOD"];
		if($_SERVER["REQUEST_METHOD"]) {
			switch ($method_name) {
				case 'GET':
					$query = "SELECT * from recordings";
					$result = mysqli_query($conn, $query);
								
					while ($row = mysqli_fetch_row($result)) {
						$recordings[] = array(
							"id" => $row[0],
							"name" => $row[1],
							"audio" => $row[2],
							"created_at" => $row[3]
						);
					}
				 
					$data = response($recordings);
					break;
				case 'POST':
					$request = json_decode(file_get_contents("php://input"));				
					$name = $request->name;
					$audio = $request->audio;
					$query = "INSERT INTO recordings(name, audio) VALUES ('$name','$audio')";
					if(mysqli_query($conn, $query))
					{
						$data = response(["result" => "Recording created successfuly"], 201);
					}
					else{
						$data = response(["result" => "Something went wrong"], 500, "error");
					}
					break;

				case 'PUT':
					$request = json_decode(file_get_contents("php://input"));
					$id = $request->id;
					$name = $request->name;
					$audio = $request->audio;
					$query = "UPDATE recordings SET name='$name', audio='$audio' WHERE id=$id;";
					if(mysqli_query($conn, $query))
					{
						$data = response(["result" => "Recording updated successfuly"], 200);
					}
					else{
						$data = response(["result" => "Something went wrong"], 500, "error");
					}
					break;

				case 'DELETE':
					$request = json_decode(file_get_contents("php://input"));
					$id = $request->id;
					$query = "DELETE FROM recordings WHERE id=$id;";
					if(mysqli_query($conn, $query))
					{
						$data = response(["result" => "Recording deleted successfuly"], 200);
					}
					else{
						$data = response(["result" => "Something went wrong"], 500, "error");
					}
					break;
				default:
					$data = response(["result" => "Please enter proper request method"], 400, "error");
					break;
			}
			echo json_encode($data);
		} else {
			$data = response(["result" => "Please enter proper request method"], 400, "error");
			echo json_encode($data);
		}
		
	}
	catch(Exception $e) {
		 echo 'Caught exception: ',  $e->getMessage(), "\n";
	}