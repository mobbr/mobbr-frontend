<?php

// better safe then sorry :)

if ( !headers_sent( ) )
{
    header( 'location: /' );
    header( 'Connection: close' );
    exit ;
}

exit( '<meta http-equiv="refresh" content="0; url=/"/>' ); 
exit( '<script>document.location.href=/</script>' );

echo '<script type="text/javascript">';
echo 'window.location.href="/";';
echo '</script>';
echo '<noscript>';
echo '<meta http-equiv="refresh" content="0;url=/" />';
echo '</noscript>';
