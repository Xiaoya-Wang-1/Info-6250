# 🐾 Cat Care Tracker

Welcome to **Cat Care Tracker**, the purr‑fect little SPA for keeping tabs on your fabulous felines and their daily to‑do lists. Log in, add fluffy friends, schedule baths and vet visits, then bask in the glow of your well‑organized kitty kingdom—all in one browser tab!

---

## ✨ Why it’s Meow‑velous

- **One‑stop cat hub** – Register, log in, and manage an unlimited lineup of cats.  
- **Task tracking** – Create, check off, and delete tasks for each cat.  
- **Cute photo previews** – Upload local images and see them instantly.  
- **Responsive & minimal** – Built with vanilla CSS; scales from phone to desktop.  
- **Security basics** – Session cookie auth; server‑side validation & XSS escaping.  
- **Dog‑gone security** – User **`dog`** is forever banned for… reasons. 🐶🚫  

---

## 🛠 Tech Stack

| Layer       | Goodies                                                      |
|-------------|--------------------------------------------------------------|
| Front End   | Vite + React 18, plain CSS, Fetch API (promises, no async/await) |
| Back End    | Node 18, Express, Cookie‑Parser                              |
| Lint / Tests| ESLint (recommended + React hooks)                           |
| Allowed assets | Icons from Google Fonts, placeholder cat pics from Unsplash |

No routers, CSS‑in‑JS, Axios, Bootstrap, or other forbidden snacks were harmed in the making of this app.

---

## 🚀 Getting Started

```bash
git clone https://github.com/your‑user/cat‑care‑tracker.git
cd cat‑care‑tracker

# install deps
npm install

# build production bundle
npm run build

# start express server (serves /dist + REST API)
npm start
```

Visit **http://localhost:3000** — the SPA will load automatically.

> **Dev mode:** `npm run dev` launches Vite with hot reload on **http://localhost:5173**  
> (This command is optional; grading only checks the three commands above.)

---

## 🐈‍⬛ How to Use (User)

1. **Register** a username (anything except `dog`, which is banned).  
2. **Log in** with that username; a session cookie (`sid`) is set.  
3. **Add Cat** – fill name, birthday, weight, and pick an optional local photo.  
4. **Manage tasks** – type in the textarea → *Add Task* → click task text to toggle done → delete if needed.  
5. **Modify** or **Delete** cats any time.  
6. **Log out** – session is cleared, cookies wiped, and you’re back at login.  

All data lives in memory—refreshing the server sends your kitties on vacation. 🏝

---

## 🛡 Admin Panel

At the login screen select **Admin**, then enter the admin credentials:
  
| *Admin Name*  | *Admin Password:* | 
|---------------|-------------------|
| `admin`       | `123456`          |
| `boss`        | `pa5word`         |
| …             | …                 |

Once logged in, you’ll see a **Registered Users** list (styled as a three‑column table):

| Name        | Registered Date (MM/DD/YYYY) | Operation |
|-------------|------------------------------|-----------|
| username1   | 04/18/2025                   | [Delete]  |
| username2   | 04/19/2025                   | [Delete]  |
| …           | …                            | …         |

- New users appear at the bottom of this list as they register.  
- Click **Delete** to remove a user entirely (all their cats and tasks will be lost).  
- The list header remains visible even when there are no registered users.

To return to user mode, click **Logout Admin**, then switch back to **User** and log in normally.

---

> 🔐 **Authentication**  
> - Only `POST /api/register` and `POST /api/session` are publicly accessible.  
> - **All other** endpoints require a valid `sid` cookie (set by `/api/session`).  
> - Admin routes (`/api/admin/*`) additionally require the `X-Admin-Username` and `X-Admin-Password` headers.


## 📡 API Cheatsheet

| Method     | Endpoint                         | Body / Headers                                       | Purpose               |
|------------|----------------------------------|------------------------------------------------------|-----------------------|
| `POST`     | `/api/register`                  | `{ "username": String }`                             | Create new user       |
| `POST`     | `/api/session`                   | `{ "username": String }`                             | Log in (sets cookie)  |
| `DELETE`   | `/api/session`                   | –                                                    | Log out               |
| `GET`      | `/api/cats`                      | (cookie `sid`)                                       | List cats             |
| `POST`     | `/api/cats`                      | `{ name, birthday, weight, photoUrl? }`              | Add cat               |
| `PUT`      | `/api/cats/:catId`               | `{ name?, birthday?, weight?, photoUrl? }`           | Edit cat              |
| `DELETE`   | `/api/cats/:catId`               | –                                                    | Remove cat            |
| `POST`     | `/api/cats/:catId/tasks`         | `{ title: String }`                                  | Add task              |
| `PUT`      | `/api/cats/:catId/tasks/:taskId` | `{ done: Boolean }`                                  | Toggle task           |
| `DELETE`   | `/api/cats/:catId/tasks/:taskId` | –                                                    | Delete task           |
| `GET`      | `/api/admin/users`               | Headers: `X-Admin-Username`, `X-Admin-Password`      | List users            |
| `DELETE`   | `/api/admin/users/:username`     | Headers: `X-Admin-Username`, `X-Admin-Password`      | Delete user           |

All endpoints respond with JSON.

---

## 📁 Project Structure

```
cat-care-tracker
├─ public
│  ├─ default.png
│  └─ logo.svg
├─ src
│  ├─ components
│  │  ├─ AddCatForm.jsx
│  │  ├─ AdminPage.jsx
│  │  ├─ CatEditForm.jsx
│  │  ├─ CatItem.jsx
│  │  ├─ CatList.jsx
│  │  ├─ LoginPage.jsx
│  │  ├─ MainPage.jsx
│  │  ├─ Navigation.jsx
│  │  └─ RegisterPage.jsx
│  ├─ styles
│  │  ├─ admin.css
│  │  ├─ base.css
│  │  ├─ components.css
│  │  └─ responsive.css
│  ├─ App.css
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ model.js
│  └─ utils.js
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
├─ server.js
└─ vite.config.js
```

---

## 📸 Credits

- Cat placeholder images – original and created by me.  
- Icons – [Google Fonts – Material Symbols](https://fonts.google.com/icons). 

No other third‑party assets are included.

---

## ❓ FAQ

> **Q.** Why is user `dog` banned?  
> **A.** Cats demanded it. Union rules.

> **Q.** Where’s a database?  
> **A.** In my future expansion plans! For now, it’s RAM‑only to keep grading simple.

> **Q.** Can I refresh without losing data?  
> **A.** Not yet—embrace the ephemeral zen of cat herding.

> **Q.** How do I get back to user login from admin panel?  
> **A.** Click **Logout Admin**, then switch the radio back to **User** and log in normally.

---

## 🎉 Have Fun & Happy Cat‑Tracking!

If you spot a hairball in the code, open an issue or scratch me a PR. Meow!  