<?php
$fp = fopen('log.txt', 'w');
fwrite($fp, 'Cats chase mice');
fclose($fp);
?>