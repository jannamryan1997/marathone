ng build --prod
pause
winscp.exe annaniks /keepuptodate "C:\Users\Janna\Desktop\marathon\dist\marathon" /var/www/marathonweb /defaults
pause
# plink -ssh honey@honey.bestmx.net:321 -pw 3xWB94kY "sudo service nginx restart"