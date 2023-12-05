<?php
$content ='';
foreach($_POST as $key => $value) { 
    if($value){
        $content .= "<b>$key</b>: <i>$value</i>\n";
    }
}
if(trim($content)) {
    $content ="<b>Message form Site:</b>\n".$content;
    // tu bot token dada desde @Botfather
    $apiToken="6472575288:AAFy8bCAS1cf4AdqITNjTSBJzjbh97ifYbU";
    $data=[
        //el usuario que le enviar el mesaje telegram chat id
        'chat_id' =>'@mesajedelapagina',
        'text'=> $content,
        'parse_mode'=> 'HTML',
    ];
    $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?".http_build_query($data));
}
?>