from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app import db, app
from flask_login import UserMixin
import enum


class Role(enum.Enum):
    USER = 1
    ADMIN = 2
    S_AGENT = 3
    I_MANAGER = 4

class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False, unique=True)
    email = Column(String(250), nullable=True, unique=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    address = Column(String(255), unique=True, nullable=False)
    avatar = Column(String(100),
                    default='https://res.cloudinary.com/dxxwcby8l/image/upload/v1688179242/hclq65mc6so7vdrbp7hz.jpg')
    user_role = Column(Enum(Role), default=Role.USER)

    def __str__(self):
        return self.name


class Category(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True, nullable=False)

    def __str__(self):
        return self.name


class Book(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True, nullable=False)
    author_book = Column(String(255), unique=True, nullable=False)
    price = Column(Float, default=0)
    quantity = Column(Integer, nullable=False)
    image = Column(String(1000), nullable=False)
    category_id = Column(Integer, ForeignKey(Category.id))

    def __str__(self):
        return self.name

class Payment(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    method = Column(String(100), unique=True)

class Order(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id))
    book_id = Column(Integer, ForeignKey(Book.id))
    quantity = Column(Integer, nullable=False)
    start_date = Column(DateTime, default=datetime.now())
    payment_method = Column(Integer, ForeignKey(Payment.id))

class Cart(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    book_id = Column(Integer, ForeignKey(Book.id), nullable=False)
    quantity = Column(Integer, default=1)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        import hashlib

        u1 = User(name='Admin', username='admin',
                 password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()),
                 user_role=Role.ADMIN, address="A100")
        u2 = User(name='User', username='user',
                  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()),
                  user_role=Role.USER, address="A101")
        u3 = User(name='Seller', username='seller',
                  password=str(hashlib.md5('123456'.encode('utf-8')).hexdigest()),
                  user_role=Role.S_AGENT, address="A102")
        db.session.add_all([u1,u2, u3])
        db.session.commit()

        c1 = Category(name='Tiểu Thuyết')
        c2 = Category(name='Tiếng Anh')
        c3 = Category(name='Văn Học')
        c4 = Category(name='Truyện Tranh')

        db.session.add_all([c1, c2, c3, c4])
        db.session.commit()

        p1 = Payment(method="Thanh toán khi nhận hàng")
        p2 = Payment(method="Thanh toán qua ngân hàng")
        p3 = Payment(method="Thanh toán tại cửa hàng")

        db.session.add_all([p1,p2,p3])
        db.session.commit()

        b1 = Book(name="National Geographic Answer Book, Updated Edition: 10,001 Fast Facts About Our World",
                  author_book="National Geography", price=1482690, quantity=300, category_id=2,
                  image="https://cdn-amz.woka.io/images/I/81moevBuc7L._SR476,476_.jpg")
        b2 = Book(name="Tớ muốn ăn tụy của cậu",
                  author_book="Yoru Sumino", price=71000, quantity=300, category_id=1,
                  image="https://salt.tikicdn.com/cache/750x750/ts/product/90/c4/cd/d4f85346e6b17cf2f40bea1d36c8d543.jpg.webp")
        b3 = Book(name="Truyện Tranh Khoa Học Về Các Loài Côn Trùng - Người Bạn Đáng Ngờ - Đom Đóm",
                  author_book="Lưu Tiểu Muội, Hầu Á Nam", price=49300, quantity=300, category_id=4,
                  image="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/truyen_tranh_khoa_hoc_ve_cac_loai_con_trung___nguoi_ban_dang_ngo___dom_dom/2023_03_13_17_23_18_1-390x510.jpg?_gl=1*1h8o2iq*_ga*OTQxOTIxOTY5LjE3MDAxMDQzOTE.*_ga_460L9JMC2G*MTcwMTY5MDExMi4zLjAuMTcwMTY5MDExMi42MC4wLjA.*_gcl_aw*R0NMLjE3MDAxMDU3NzEuQ2p3S0NBaUE5ZEdxQmhBcUVpd0FtUnBUQzYwM2twY2dQcllOWUY2Nmgwc0xyRFZ1TXFVcUFZS2JEUVRiQjJkbnIxTVU2VUFnSjZKZjFSb0NuaDRRQXZEX0J3RQ..*_gcl_au*NTAxMjQ0MDY4LjE3MDAxMDQzOTE.")

        db.session.add_all([b1, b2, b3])
        db.session.commit()
