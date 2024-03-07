from flask import render_template, request, redirect, session, jsonify, url_for
from flask_login import login_user, current_user, logout_user, login_required, LoginManager
from app import app, login, db
import dao
import math
from app.models import Role, User, Cart
from app.utils import count_cart
import hashlib


@app.route("/")
def index():
    kw = request.args.get('kw')
    cate_id = request.args.get('cate_id')
    page = request.args.get('page')
    user = current_user

    categories = dao.getAllCate()
    books = dao.getBook(kw, cate_id, page)

    num = dao.count_book()

    return render_template('client/index.html', books=books, cates=categories,
                           pages=math.ceil(num / app.config['PAGE_SIZE']), user=user, Role=Role)


@app.route("/detail")
def detail():
    book_id = request.args.get('book_id')
    user = current_user

    categories = dao.getAllCate()
    book = dao.getBookById(book_id)
    cate = dao.getCateById(book.category_id).name
    return render_template('client/info.html', book=book, cate=cate, cates=categories, user=user, Role=Role)


@app.route("/description/detail")
def descript():
    book_id = request.args.get('book_id')

    categories = dao.getAllCate()
    book = dao.getBookById(book_id)
    user = current_user

    return render_template('client/description.html', book=book, cates=categories, user=user, Role=Role)


@app.route("/sign-up", methods=['get', 'post'])
def sign_up():
    if request.method == 'POST':
        fullname = request.form.get('fullname')
        username = request.form.get('username')
        password = request.form.get('password')
        address = request.form.get('address')
        email = request.form.get('email')
        confirm = request.form.get('confirm')
        if confirm == password:
            u = User(name=fullname, username=username,
                     password=str(hashlib.md5(password.encode('utf-8')).hexdigest()),
                     user_role=Role.USER, address=address, email=email)
            db.session.add(u)
            db.session.commit()
            return redirect('/login')
        else:
            return redirect('/sign-up')

    user = None
    return render_template('client/sign_up.html', user=user, Role=Role)


@app.route('/login', methods=['get', 'post'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = dao.auth_user(username=username, password=password)
        if user:
            login_user(user=user)
            if user.user_role == Role.ADMIN:
                return redirect('/admin')

        return redirect('/')
    user = None
    return render_template('client/login.html', user=user, Role=Role)


@app.route('/logout', methods=['post'])
def logout():
    logout_user()
    return redirect('/')


@login.user_loader
def get_user(user_id):
    return dao.get_user_by_id(user_id)


@app.route('/cart', methods=['post'])
def add_cart():
    book_id = request.form.get('book_id')

    cart_item = Cart.query.filter_by(user_id=current_user.id, book_id=book_id).first()

    if not cart_item:
        new_cart = Cart(user_id=current_user.id, book_id=book_id)
        db.session.add(new_cart)
    else:
        cart_item.quantity += 1

    db.session.commit()
    return redirect("/cart")


@app.route('/cart/remove', methods=['post'])
def remove_cart():
    user = current_user
    book_id = request.form.get("book_id")
    carts = dao.getBookInCart(user_id=user.id, book_id=book_id)

    for cart_item in carts:
        db.session.delete(cart_item)
        db.session.commit()
    return redirect('/cart')


@app.route('/cart')
@login_required
def cart():
    user = current_user
    cart = dao.getCart(user.id)
    categories = dao.getAllCate()

    cart_arr = []
    for cart_item in cart:
        book_id = cart_item.book_id
        cart_quantity = cart_item.quantity
        book = dao.getBookById(book_id)
        cart_arr.append({"book": book, "quantity": cart_quantity})

    return render_template('client/cart.html', user=user, Role=Role, carts=cart_arr, cates=categories)


@app.route('/admin')
@login_required
def admin():
    user = current_user

    return render_template('admin/graph.html', user=user, Role=Role)


@app.route('/admin/management')
@login_required
def manage():
    kw = request.args.get('kw')
    cate_id = request.args.get('cate_id')
    page = request.args.get('page')
    user = current_user
    books = dao.getBook(kw, cate_id, page)
    data = []
    for book in books:
        cate=dao.getCateById(book.category_id)
        data.append({"book": book, "cate":cate.name})
    return render_template('admin/allbook.html', user=user, books=data)


@app.route('/admin/management/add', methods=["POST", "GET"])
@login_required
def addBook():
    user = current_user
    cates = dao.getAllCate()
    if request.method == "POST":
        name = request.form.get("name")
        author = request.form.get("author")
        cate = request.form.get("cate")
        price = request.form.get("price")
        quantity = request.form.get("quantity")
        image = request.files["image"]
        dao.addBook(name, author, cate, price, quantity, image)

    return render_template('admin/addbook.html', user=user, cates=cates)


@app.route('/order')
@login_required
def payment():
    user = current_user
    order_arr = []
    payment = dao.getMethodPayment()

    ids = request.args.getlist("id")
    quantities = request.args.getlist("quantity")
    for i in range(len(ids)):
        order_arr.append({"book": dao.getBookById(ids[i]), "quantity": quantities[i]})

    return render_template('client/payment.html', user=user, Role=Role, orders=order_arr, payments=payment)


@app.route('/order/add', methods=["POST"])
@login_required
def addOrder():
    user = current_user
    if request.method == 'POST':
        order_data = request.json
        books = order_data.get('books')
        method = order_data.get("method")
        for book in books:
            dao.addOrder(user.id, book['id'], book['quantity'], method)
    return redirect("/")


@login.unauthorized_handler
def unauthorized_callback():
    return redirect('/login')


if __name__ == '__main__':
    # from app import admin
    app.run(debug=True)
