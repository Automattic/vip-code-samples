Miscellany
----------

These are less-frequently-used things

### [Block JetPack from syncing except via cron](jetpack-sync-cron-only.php)
Jetpack will sync content by tagging on to normal page requests. If this causes performance issues, this code will move that to cron only.

### [Host and serve static files](serve-html.php)

Sometimes you might need to serve a static file - e.g. a HTML file.
That might be the case for a file download you only want to provide to certain users, or
for a limited period of time.

Rather than referencing a file directly in your code, 
you can serve static HTML or other types of content with this snippet. 