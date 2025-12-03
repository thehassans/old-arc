# Old Arcade - Plesk Deployment Guide

## Domain: old-arcade.com

---

## 📁 Directory Structure on Plesk

```
/var/www/vhosts/old-arcade.com/
├── httpdocs/              ← Document Root (Client Build)
│   ├── index.html
│   ├── assets/
│   └── ...
├── server/                ← Application Root (Node.js API)
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ...
└── node_modules/
```

---

## 🔧 Plesk Configuration

### Step 1: Document Root & Application Root

| Setting | Value |
|---------|-------|
| **Document Root** | `/httpdocs` |
| **Application Root** | `/server` |
| **Application Startup File** | `index.js` |
| **Application Mode** | `production` |

### Step 2: Node.js Settings in Plesk

1. Go to **Domains** → **old-arcade.com** → **Node.js**
2. Enable Node.js
3. Configure:
   - **Node.js Version**: 18.x or 20.x (LTS)
   - **Application Mode**: production
   - **Application Root**: `/server`
   - **Application Startup File**: `index.js`
   - **Document Root**: `/httpdocs`

---

## 🗄️ Database Setup (MariaDB)

### Step 1: Create Database in Plesk

1. Go to **Databases** → **Add Database**
2. Database name: `old_arcade`
3. Create a database user with full privileges
4. Note down: DB name, username, password

### Step 2: Import SQL Schema

1. Open **phpMyAdmin** from Plesk
2. Select your database
3. Go to **Import** tab
4. Upload `old_arcade_database.sql` from your Desktop
5. Click **Go** to import

---

## 🔐 Environment Variables

### Server (.env)

Create `/server/.env` on Plesk:

```env
NODE_ENV=production
PORT=5000

# Database (Use your Plesk MariaDB credentials)
DB_HOST=localhost
DB_USER=your_plesk_db_user
DB_PASSWORD=your_plesk_db_password
DB_NAME=old_arcade

# Security
JWT_SECRET=generate_a_strong_random_string_here
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://old-arcade.com
```

### Client (.env)

Create `/client/.env` before building:

```env
VITE_API_URL=https://old-arcade.com/api
VITE_APP_NAME=Old Arcade
VITE_APP_URL=https://old-arcade.com
```

---

## 🚀 Deployment Steps

### Step 1: Build Client Locally

```bash
cd client
npm install
npm run build
```

This creates the `dist` folder.

### Step 2: Upload Files to Plesk

**Option A: Using File Manager**
1. Upload contents of `client/dist/` to `/httpdocs/`
2. Upload `server/` folder to `/server/`

**Option B: Using Git (Recommended)**
1. Set up Git in Plesk
2. Clone your repo
3. Run build commands via SSH

### Step 3: Install Server Dependencies

Via Plesk SSH or File Manager Terminal:

```bash
cd /var/www/vhosts/old-arcade.com/server
npm install --production
```

### Step 4: Configure Apache/Nginx

Add to `.htaccess` in `/httpdocs/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle API requests - proxy to Node.js
  RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
  
  # Handle client-side routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Or for Nginx (Additional Nginx Directives in Plesk):

```nginx
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

### Step 5: Start Node.js App

In Plesk Node.js settings:
1. Click **NPM Install**
2. Click **Restart App**

---

## 🔒 SSL Configuration

1. Go to **SSL/TLS Certificates** in Plesk
2. Install Let's Encrypt certificate
3. Enable **Redirect HTTP to HTTPS**

---

## 📋 Checklist

- [ ] Database created in Plesk
- [ ] SQL schema imported
- [ ] Server `.env` file configured
- [ ] Client built with correct API URL
- [ ] Files uploaded to correct directories
- [ ] Node.js dependencies installed
- [ ] Apache/Nginx configured for SPA routing
- [ ] SSL certificate installed
- [ ] Node.js app started and running

---

## 🔍 Troubleshooting

### API Not Working
- Check Node.js is running in Plesk
- Verify `.env` database credentials
- Check Plesk error logs

### 404 on Page Refresh
- Ensure `.htaccess` or Nginx config is correct
- Document root should point to client build

### Database Connection Failed
- Verify MariaDB credentials
- Check if database user has proper permissions
- Ensure `DB_HOST=localhost` (not 127.0.0.1)

### CORS Errors
- Update `CORS_ORIGIN` in server `.env`
- Restart Node.js app after changes

---

## 📞 Support

For issues, check:
1. Plesk Error Logs
2. Node.js Application Logs
3. Browser Developer Console
