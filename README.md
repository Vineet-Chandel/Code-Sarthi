# 🔐 Authentication API

### 1  ➤ Sign Up
Creates a new user account and returns user data with authentication cookie.

```
POST /auth/signup
```
---

### 📥 Request Body

```json
{
  "firstName": "Vineet",
  "middleName": "Kumar",
  "lastName": "Chandel",
  "gmail": "vineet@gmail.com",
  "password": "123456",
  "username": "vineet123",
  "age": 20,
  "gender": "male",
  "college": "PSIT Kanpur",
  "profession": "Student",
  "termsAccepted": true
}
```

### 📥 Response Body 

``` json

{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "firstName": "Vineet",
    "username": "vineet123",
    "gmail": "vineet@gmail.com"
}

```
### POINTERS :
1 ) if the gmail or username already exists  -- Request rejects with status code 409 .

2 ) encryption of the password is been done then only the whole data is been saved to our database .

3 )it will validate the credentials then it will save the cookies for the further api . 


---

### 2 ➤ Sign In
login the existing user after authenticating them. 

```
POST /auth/signin
```
---

### 📥 Request Body

```json
{
  "gmail": "vineet@gmail.com",
  "password": "123456",
}
```

### 📥 Response Body 

``` json

{
  "success": true,
  "message": "User logined successfully",
  "data": {
    "id": "user_id",
    "firstName": "Vineet",
    "username": "vineet123",
    "gmail": "vineet@gmail.com"
}

```
### POINTERS :
1 ) if the gmail or username not exists  -- Request rejects with status code 401 .

2 ) it will validate the credentials then it will save the cookies for the further api . 




### 3 ➤ Sign Out
Logs out the currently authenticated user by clearing the authentication cookie. 

```
POST /auth/signout
```
---

### 🔐 Authentication

- Requires user to be logged in  
- Uses cookie-based authentication (`token`)

---

### ⚙️ What it does

- Clears the JWT token stored in cookies  
- Ends user session on client side  

---

### 📥 Request

No request body required

---

## 4  ➤  Email Verification APIs

These APIs handle user email verification using OTP (One-Time Password).

---

## 🔐 Authentication Required

Both endpoints require:
- Logged-in user
- Valid JWT cookie (`token`)

---

# 📩 1. Send Verification OTP

### ➤ Send Otp
```
GET /auth/verify-email
```
---
### ⚙️ Features
- Generates a 6-digit OTP and sends it to the user's registered email.
- OTP is securely hashed using bcrypt  
- Stored in Redis with expiry (5 minutes)  
- Rate limited (max 3 attempts per 5 minutes)  
- Sends professional email template with OTP  

---

### 📥 Request

No body required


### 📤 Success Response (200)
```
{
  "success": true,
  "message": "Verification send to email"
}
```

### 📤 Already Verified (400)
```
{
  "success": false,
  "message": "User is already verified"
}
```

### 📤 Rate Limit Exceed (429)
```
{
  "success": false,
  "message": "Too many OTP requests. Try again later."
}
```


# 📩 1. To Verify OTP

### ➤ Verify Otp
```
POST /auth/verify-email
```
---
### ⚙️ Features
- Verifies the OTP entered by the user and marks the email as verified.
- Sends professional email template with confirmation of verification once the verification is been done  

---

### 📥 Request

```
{
  "toVerifyotp": "123456"
}
```


### 📤 Success Response (200)
```
{
  "success": true,
  "message": "Email verified"
}
```

### 📤 Invalid Otp (400)
```
{
  "success": false,
  "message": "Invalid Otp"
}
```

### 📤 OTP Expired (429)
```
{
  "success": false,
  "message": "Invalid Otp"
}
```
