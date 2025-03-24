# Weigh My Pack

The **Weigh My Pack** project is a full-stack application that allows users to track and manage the weight of their backpacking gear. The app consists of a **Django REST API** backend and a **React** frontend.

- **Live Site:** [WeighMyPack.app](https://weighmypack.app/)

- **Example:** [Cathy's Backpacking List](https://weighmypack.app/#/73vGDoxAvHST5jEdvjvmS5)

## Features

- **Track your gear weight**: Add gear items, categorize them, and visualize the weight breakdown in a doughnut chart
- **Share Lists**: Share your pack gear list to others as a link
- **User Log in and Local Functionality**: Users are able to create lists that store to their localStorage on their browser if they don't want to log in

## Screenshots
User's Dashboard Page
![Dashboard](screenshots/Dashboard.png)

Edit Item
![Dashboard](screenshots/EditItem.png)

## Technologies Used

- **Backend**: Django REST Framework
- **Frontend**: React (Create React App), Chart.js
- **Database**: PostgreSQL

## Running the Application
### Prerequisites

Before starting, ensure you have the following installed:

**Backend:**
- Python 3.8 or higher
- pip 
- PostgreSQL (if using a PostgreSQL database)

**Frontend:**
- Node.js 
- npm 

### Environment Variables
This project uses environment variables for configuration. Below are the details for setting up the local development and production environments, including the email configuration for Gmail.

The following environment variables must be set for the project to function correctly. In development, these can be added to a `config.py` file.

| Variable                | Description                                                       | Example Value                                           |
|-------------------------|-------------------------------------------------------------------|-------------------------------------------------------|
| `ALLOWED_HOSTS`         | Comma-separated list of allowed hosts                            | `127.0.0.1`                                           |
| `DEBUG`                 | Debug mode for the application (should be `False` in production) | `True`                                                |
| `SECRET_KEY`            | Secret key for Django application keep this secure in production| `django-insecure-xyz123`                              |
| `DATABASE_URL`          | Database connection string                                       | `postgresql://user:password@host:port/database_name`  |
| `CORS_ALLOWED_ORIGINS`  | Comma-separated list of origins for CORS                         | `http://localhost:3000,http://localhost:3001`         |

### Gmail Email Configuration

These variables are required for enabling email functionality via Gmail's SMTP server.

| Variable                | Description                              | Example Value                  |
|-------------------------|------------------------------------------|--------------------------------|
| `EMAIL_HOST_USER`       | Gmail address used for sending emails    | `your-email@gmail.com`         |
| `EMAIL_HOST_PASSWORD`   | App password for the Gmail account       | `your-app-password`            |

**Important:** Do not use your Gmail account's main password. Instead, create an [app password](https://support.google.com/accounts/answer/185833?hl=en) for enhanced security.

---

### 1. Clone Repository
- Clone directory and navigate to project folder
    ```bash
    git clone https://github.com/cathyxdo/weigh_my_pack.git
    cd weigh_my_pack
    ```
### 2. Backend Setup (Django REST API)
- Navigate to backend directory
    ```bash
    cd backend
    ```
- Create virtual environment
    ``` bash
    python -m venv venv
    ```
- Start virtual environment
    ``` bash
    source venv/bin/activate
    ```

- Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

- Create a new PostgreSQL database (e.g., weigh_my_pack). Note database url to add to environment variables later
    ```bash
    postgresql://username:password@localhost:5432/weigh_my_pack
    ```


- For local development, you can use a `config.py` file or a `.env` file. Below is an example of how to set these variables in the `config.py` file inside the backend folder:
    ```python
    import os

    # General settings
    os.environ.setdefault("ALLOWED_HOSTS", "127.0.0.1")
    os.environ.setdefault("DEBUG", "True")
    os.environ.setdefault("SECRET_KEY", "django-insecure-xyz123")
    os.environ.setdefault("DATABASE_URL", "postgresql://user:password@host:port/database_name")
    os.environ.setdefault("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001")

    # Gmail email settings
    os.environ.setdefault("EMAIL_HOST_USER", "your-email@gmail.com")
    os.environ.setdefault("EMAIL_HOST_PASSWORD", "your-app-password")
    ```
- Set up the database:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

- Run the Django development server:
    ```bash
    python manage.py runserver
    ```

Your Django backend should now be running at `http://127.0.0.1:8000/`.

### 3. Frontend Setup (React)

Make sure you have Node.js and npm installed.
- Navigate to frontend directory:
    ```bash
    cd ../frontend
    ```

- Install dependencies:
    ```bash
    npm install
    ```

- Set environment variables in the `.env` file:
    ```env
    REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/
    REACT_APP_SHARE_PAGE_BASE_URL=http://localhost:3000/#/
    ```

- Start the React development server:
    ```bash
    npm start
    ```

Your React frontend should now be running at `http://localhost:3000/`.


## Deployment

Both the backend and frontend can be deployed separately or together, depending on your preference. You will need to configure environment variables for production in your hosting platform.

## Future Features

- Drag and Drop items to move in the list
- Duplicate Lists
- Mark items as consummable (i.e. many backpackers like to track their food weight, but don't consider it in the overall pack weight)
- Change Colors in the Graph

## Contributing

Feel free to fork the project and submit pull requests for any improvements, bug fixes, or new features!

## License

This project is open-source and available under the MIT License.
