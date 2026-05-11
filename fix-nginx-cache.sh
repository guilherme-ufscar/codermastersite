#!/bin/bash
# Script para reescrever o nginx conf do codermaster.com.br
# Desabilita cache de proxy para conteúdo dinâmico (Next.js)
# Uso: sudo bash fix-nginx-cache.sh

CONF_PATH="/www/server/panel/vhost/nginx/codermaster.com.br.conf"

cat > "$CONF_PATH" << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl http2;
    server_name codermaster.com.br;
    index index.html;
    root /www/wwwroot/codermaster.com.br;
    include /www/server/panel/vhost/nginx/extension/codermaster.com.br/*.conf;

    #CERT-APPLY-CHECK--START
    include /www/server/panel/vhost/nginx/well-known/codermaster.com.br.conf;
    #CERT-APPLY-CHECK--END

    #SSL-START
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    ssl_certificate    /www/server/panel/vhost/cert/codermaster.com.br/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/codermaster.com.br/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_tickets on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497 https://$host$request_uri;
    #SSL-END

    #ERROR-PAGE-START
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END

    #PROXY-CONF-START
    location / {
        proxy_pass http://127.0.0.1:10202;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Real-Port $remote_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header REMOTE-HOST $remote_addr;

        proxy_connect_timeout 60s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # DESABILITA CACHE - resolve o problema de precisar trocar porta
        proxy_no_cache 1;
        proxy_cache_bypass 1;
        add_header X-Cache-Status "BYPASS" always;
    }

    # Assets estáticos do Next.js (_next/static) - esses SIM podem ter cache longo
    location /_next/static/ {
        proxy_pass http://127.0.0.1:10202;
        proxy_set_header Host $http_host;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Imagens e uploads - cache médio
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|woff2|woff|ttf|css|js)$ {
        proxy_pass http://127.0.0.1:10202;
        proxy_set_header Host $http_host;
        expires 30d;
        add_header Cache-Control "public";
    }
    #PROXY-CONF-END

    #Prohibited access to files or directories
    location ~ ^/(\.user\.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README\.md) {
        return 404;
    }

    location /.well-known {
        allow all;
        root /www/wwwroot/codermaster.com.br;
    }

    if ( $uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$" ) {
        return 403;
    }

    #LOG START
    access_log  /www/wwwlogs/codermaster.com.br.log;
    error_log  /www/wwwlogs/codermaster.com.br.error.log;
    #LOG END
}
NGINX

# Remove o proxy_cache_path se existir (não precisamos mais)
sed -i '/proxy_cache_path.*codermaster/d' /www/server/panel/vhost/nginx/codermaster.com.br.conf 2>/dev/null

# Testa a configuração
nginx -t

if [ $? -eq 0 ]; then
    # Recarrega o nginx
    nginx -s reload
    echo ""
    echo "✅ Nginx reconfigurado com sucesso!"
    echo "   - Cache de proxy DESABILITADO para conteúdo dinâmico"
    echo "   - Cache HABILITADO apenas para assets estáticos (_next/static)"
    echo "   - Não precisa mais trocar porta para ver atualizações"
else
    echo ""
    echo "❌ Erro na configuração do Nginx. Verifique o arquivo:"
    echo "   $CONF_PATH"
fi
