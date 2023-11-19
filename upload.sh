#!/bin/bash
echo "Uploading site"
tar -czvf site.tar.gz public
scp -r site.tar.gz site:
ssh site 'rm -rf /home/smerkous/public'
ssh site 'rm -rf /home/smerkous/public_html/*'
ssh site 'tar xzvf site.tar.gz -C /home/smerkous/public_html/ && mv /home/smerkous/public_html/public/* /home/smerkous/public_html/'
ssh site 'chmod 644 -R public_html/images/about.jpeg'
echo "Done!"