<!doctype html>
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
   <title>Ваше сообщение успешно отправлено</title>
</head>
 
<body>
 
<?php
   $back = "<p><a href=\"javascript: history.back()\">Вернуться назад</a></p>";
 
   if(!empty($_POST['email']) and !empty($_POST['phone'])){
      $email = trim(strip_tags($_POST['email']));
      $phone = trim(strip_tags($_POST['phone']));
      $headers =  'MIME-Version: 1.0' . "\r\n"; 
      $headers .= 'From: Your name <info@address.com>' . "\r\n";
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 
      mail('dimaboblitvinenko@gmail.com', 'Письмо с сайта по товару "Кран бойлер з екраном Delimano RX-011"',
      'Вам написал: '.$email.'<br />Его номер: '.$phone, $headers,"Content-type:text/html;charset=windows-1251");
 
      echo "Ваше сообщение успешно отправлено!<Br> Вы получите ответ в
      ближайшее время<Br> $back";
 
      exit;
   }
   else {
      echo "Для отправки сообщения заполните все поля! $back";
      exit;
   }
?>
</body>
</html>