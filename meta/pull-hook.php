<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

if ( $_POST['payload'] ) {
  output = shell_exec( 'cd /imsaundefined && git pull' );
  echo $output;
}

?>