from app.models import Category, User, Book, Role, Cart, Order, Payment
from app import app, db
import hashlib
from flask_login import current_user
import cloudinary.uploader

def getAllCate():
    return Category.query.all()

def getBook(kw=None, cate_id=None, page=None):
    books = Book.query

    if kw:
        books = books.filter(Book.name.contains(kw))

    if cate_id:
        books = books.filter(Book.category_id.__eq__(cate_id))

    if page:
        page = int(page)
        page_size = app.config['PAGE_SIZE']
        start = (page - 1)*page_size

        return books.slice(start, start + page_size)

    return books.all()

def getBookById(id):
    return Book.query.get(id)

def get_user_by_id(user_id):
    return User.query.get(user_id)

def auth_user(username, password):
    password = str(hashlib.md5(password.strip().encode('utf-8')).hexdigest())

    return User.query.filter(User.username.__eq__(username.strip()),
                             User.password.__eq__(password)).first()

def getCateById(id):
    return Category.query.get(id)

def getCart(user_id):
    return Cart.query.filter(Cart.user_id.__eq__(user_id))

def getBookInCart(user_id, book_id):
    return Cart.query.filter_by(user_id=user_id,book_id=book_id)

def addOrder(user_id, book_id, quantity, method):
    order=Order(user_id=user_id, book_id=book_id, quantity=quantity, payment_method=method)
    db.session.add(order)
    db.session.commit()

def addBook(name, author, cate, price, quantity, image):
    imageBook = cloudinary.uploader.upload(image)
    image_url = imageBook.get("secure_url")
    book = Book(name=name, author_book=author, price=price, quantity=quantity, image=image_url, category_id=cate)
    db.session.add(book)
    db.session.commit()

# def countCateInOrder():
#     orders = Order.query.all()
#     for order in orders:
#
#
#     return

def getMethodPayment():
    return Payment.query.all()

def count_book():
    return Book.query.count()