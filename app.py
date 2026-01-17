from flask import Flask, render_template, request, redirect, session, url_for
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer
from twilio.rest import Client
import random

# -------------------- APP SETUP --------------------
app = Flask(__name__)
app.secret_key = "super_secret_key"  # change in production

# -------------------- MAIL CONFIG --------------------
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "yourgmail@gmail.com"
app.config["MAIL_PASSWORD"] = "your_gmail_app_password"

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.secret_key)

# -------------------- TWILIO CONFIG --------------------
TWILIO_SID = "YOUR_TWILIO_SID"
TWILIO_AUTH = "YOUR_TWILIO_AUTH"
TWILIO_PHONE = "+1234567890"

twilio_client = Client(TWILIO_SID, TWILIO_AUTH)
otp_store = {}

# -------------------- TEMP DATABASE --------------------
users = {}  # {email: {password, verified}}

# -------------------- ROUTES --------------------

@app.route("/")
def home():
    return render_template("index.html")

# -------------------- SIGNUP --------------------
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        confirm = request.form.get("confirm_password")

        if not email or not password or not confirm:
            return "All fields are required", 400

        if password != confirm:
            return "Passwords do not match", 400

        if email in users:
            return "User already exists", 400

        users[email] = {
            "password": generate_password_hash(password),
            "verified": False
        }

        # Send verification email
        token = serializer.dumps(email, salt="email-verify")
        link = url_for("confirm_email", token=token, _external=True)

        msg = Message(
            subject="Verify your Planify account",
            sender=app.config["MAIL_USERNAME"],
            recipients=[email],
            body=f"Click the link to verify your account:\n{link}"
        )
        mail.send(msg)

        return "Signup successful! Check your email to verify."

    return render_template("signup.html")

# -------------------- EMAIL CONFIRM --------------------
@app.route("/confirm/<token>")
def confirm_email(token):
    try:
        email = serializer.loads(token, salt="email-verify", max_age=3600)
        if email in users:
            users[email]["verified"] = True
            return redirect(url_for("login"))
        return "User not found", 404
    except:
        return "Verification link invalid or expired", 400

# -------------------- LOGIN --------------------
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        if not email or not password:
            return "Email and password required", 400

        user = users.get(email)
        if not user:
            return "User not found", 404

        if not user["verified"]:
            return "Please verify your email first", 403

        if not check_password_hash(user["password"], password):
            return "Incorrect password", 401

        session["user"] = email
        return redirect(url_for("dashboard"))

    return render_template("login.html")

# -------------------- DASHBOARD --------------------
@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html")

# -------------------- LOGOUT --------------------
@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("home"))

# -------------------- SEND OTP --------------------
@app.route("/send-otp", methods=["POST"])
def send_otp():
    phone = request.form.get("phone")
    if not phone:
        return "Phone number required", 400

    otp = str(random.randint(100000, 999999))
    otp_store[phone] = otp

    twilio_client.messages.create(
        body=f"Your Planify OTP is {otp}",
        from_=TWILIO_PHONE,
        to=phone
    )

    return redirect(url_for("verify_otp"))

# -------------------- VERIFY OTP --------------------
@app.route("/verify-otp", methods=["GET", "POST"])
def verify_otp():
    if request.method == "POST":
        phone = request.form.get("phone")
        otp = request.form.get("otp")

        if otp_store.get(phone) == otp:
            session["user"] = phone
            otp_store.pop(phone)
            return redirect(url_for("dashboard"))

        return "Invalid OTP", 400

    return render_template("verify_otp.html")

# -------------------- RUN --------------------
if __name__ == "__main__":
    app.run(debug=True)
