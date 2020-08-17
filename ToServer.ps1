ng build --prod
pause
winscp.exe marathon /keepuptodate "C:\Users\Janna\Desktop\marathon\dist\marathon" /srv/www/uat /defaults
pause
# plink -ssh honey@honey.bestmx.net:321 -pw 3xWB94kY "sudo service nginx restart"