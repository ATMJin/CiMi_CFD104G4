<?php
    session_start();
    //引入連線工作的檔案
    include_once "config.php";

    //執行sql指令並取得pdoStatement
    $sql = "SELECT * FROM users WHERE unique_id != {$_SESSION['unique_id']}";
    $users = $pdo->query($sql);

    //取回所有的資料, 放在2維陣列中 fetchAll
    $usersRows = $users->fetchAll(PDO::FETCH_ASSOC);

    $output = "";

    

    if ($users -> rowCount() > 0){
        foreach($usersRows as $i => $usersRow){
            // print_r($usersRow);	

            $output.= '
                <span class="friends">
                    <div class="content">
                        <img src="https://picsum.photos/id/684/600/400" alt="">
                        <div class="details">
                            <span>'.$usersRow['fname'].'</span>
                            <p>This is test message</p>
                        </div>
                    </div>
                    <div class="status_dot"><i class="fas fa-circle"></i></div>
                    <span style="display:none;">'.$usersRow['unique_id'].'</span>
                </span>
            
            ';
        };
        echo $output;
    }else{
        echo "No friends to chat";
    }
    
?>