# API for api.astridgehome.org

File uploads based on

```
https://www.bezkoder.com/node-js-express-file-upload/
```

## Javascript server hosted at Dreamhost.com

Domain name - api.astridgehome.org
Using Proxy Server

## Preparation

```
https://panel.dreamhost.com/
```

Start proxy server

More / Proxy
Set url/to/proxy to 'api'

Set web directory to 'public'

Websites/Manage Websites / Manage / Additional setting / Paths

## Development Cycle

Edit server code

```
cd /Users/rastridge/code/astridgehome/api.astridgehome.org/ vscode kps-api
```

To Upload server code to api.astridgehome.org

```
push-astridgehome-backend-to-api-astridgehome='rsync -av --delete --exclude ".well-known/acme-challenge" --exclude "/logs" --exclude "/public" --exclude "/node_modules" --exclude ".DS_Store" --exclude "_notes"  --exclude ".git"  --exclude ".vscode"  --exclude "/imgs" ~/Code/astridgehome/api.astridgehome.org/ rastridge@buffalorugby.org:/home/rastridge/api.astridgehome.org/

```

To Restart server

Shell access to api.astridgehome.org

```
ssh rastridge@vps30249.dreamhostps.com
```

change to directory api.astridgehome.org

```
cd /home/rastridge/api.kamilpatelscholarship.org
```

```
pm2 restart ecosystem.config.js
```
