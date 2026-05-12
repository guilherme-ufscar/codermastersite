#!/bin/sh
# Start WireGuard tunnel
wg-quick up wg0 2>/dev/null

if ip a show wg0 >/dev/null 2>&1; then
  # Route only api.aibee.cloud traffic through the tunnel
  API_IP=$(wget -qO- --timeout=5 https://dns.google/resolve?name=api.aibee.cloud\&type=A 2>/dev/null | grep -o '"data":"[^"]*"' | head -1 | cut -d'"' -f4)
  if [ -n "$API_IP" ]; then
    ip route add "$API_IP"/32 dev wg0 2>/dev/null || true
  fi
fi

# Run migrations and start the app
npx prisma migrate deploy
su -s /bin/sh nextjs -c 'node server.js'
