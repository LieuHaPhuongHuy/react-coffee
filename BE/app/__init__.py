from flask import Flask
from urllib.parse import quote
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import cloudinary.api

cloudinary.config(
    cloud_name="dqek20z6v",
    api_key="169431983781579",
    api_secret="NXyOkV40ZK3QIfN2RfEZUzpwp8Y"
)

app = Flask(__name__)
app.secret_key = '111111'
app.config["SQLALCHEMY_DATABASE_URI"] ="mysql+pymysql://root:%s@localhost/bookdb?charset=utf8mb4" % quote('1234')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["PAGE_SIZE"] = 6

db = SQLAlchemy(app=app)
login = LoginManager(app=app)
