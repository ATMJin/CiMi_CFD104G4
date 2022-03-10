<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>

<?php 
switch($_FILES["upFile"]["error"]){
	case UPLOAD_ERR_OK:
		$dir = "images";

		if(file_exists($dir)==false){
			mkdir($dir); //make directory
		}

		$from = $_FILES['upFile']['tmp_name']; //含路徑
		$to = "$dir/" . $_FILES['upFile']['name'];
		if(copy($from, $to)){
			echo "上傳成功~";
		}else{
			echo "上傳失敗~";
		}
		break;
	case UPLOAD_ERR_INI_SIZE:
		echo "上傳檔案太大, 不得超過", ini_get("upload_max_filesize"),"<br>";
		break;
	case UPLOAD_ERR_FORM_SIZE:
		echo "上傳檔案太大, 不得超過", $_POST["MAX_FILE_SIZE"],"<br>";
		break;
	case UPLOAD_ERR_PARTIAL:
		echo "上傳檔案不完整 <br>";
		break;
	case UPLOAD_ERR_NO_FILE:
		echo "檔案未選 <br>";
		break;
	default:
		echo "系統暫時不能提供服務~";
}


// echo "['error']: " , $_FILES['upFile']['error'] , "<br>";
// echo "['name']: " , $_FILES['upFile']['name'] , "<br>";
// echo "['tmp_name']: " , $_FILES['upFile']['tmp_name'] , "<br>";
// echo "['type']: " , $_FILES['upFile']['type'] , "<br>";
// echo "['size']: " , $_FILES['upFile']['size'] , "<br>";


?>

</body>
</html>