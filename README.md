# DistLearnVision

# Example config.env file for RestApi. path= RestApi/config/env/config.env

#Server Variables
PORT=5000
NODE_ENV=development
ROOT_DIRECTORY=../

# URL
URL=http://localhost:5000

# Mongo Connection
MONGO_URI = ##mondodb atlas URI

#Json Web Token
JWT_SECRET_KEY = ## your_key
JWT_EXPIRE = 100m
JWT_COOKIE_EXPIRE=100

#Cookie
JWT_COOKIE=100

#Reset Password
RESET_PASSWORD_EXPIRE=3600000

#Node Mailer
SMTP_SERVER_HOST=smtp.gmail.com
SMTP_SERVER_PORT=587
SMTP_EMAIL= ##maıl
SMTP_PASS= ##password
