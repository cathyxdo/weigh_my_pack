# Weigh My Pack Project

The **Weigh My Pack** project is a full-stack application that allows users to track and manage the weight of their backpacking gear. The app consists of a **Django REST API** backend and a **React** frontend, which are run separately for development purposes.

## Features

- **Backend**: Django REST API to handle user authentication, data storage, and provide API endpoints for the frontend.
- **Frontend**: React (created with Create React App) to display and interact with the data provided by the backend.
- **Environment Configuration**: Uses environment variables for both backend and frontend for secure configuration.

## Technologies Used

- **Backend**: Django REST Framework
- **Frontend**: React (Create React App)
- **Database**: PostgreSQL (configured through environment variables)
- **Environment Variables**: `.env` for frontend and `config.py` for backend

## Running the Application

### 1. Backend Setup (Django REST API)

Make sure you have Python installed and that you have created a virtual environment for the Django project.

- Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

This project uses environment variables for configuration. Below are the details for setting up the local development and production environments, including the email configuration for Gmail.

### Environment Variables

The following environment variables must be set for the project to function correctly. In development, these can be added to a `config.py` file or loaded from a `.env` file using `python-dotenv`. In production, they should be configured directly in the hosting environment (e.g., Render, AWS, or Heroku).

### General Configuration

| Variable                | Description                                                                 | Example Value                                           |
|-------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------|
| `ALLOWED_HOSTS`         | Comma-separated list of allowed hosts                                      | `127.0.0.1`                                           |
| `DEBUG`                 | Debug mode for the application (should be `False` in production)           | `True`                                                |
| `SECRET_KEY`            | Secret key for Django application (keep this secure in production)         | `django-insecure-xyz123`                              |
| `DATABASE_URL`          | Database connection string                                                 | `postgresql://user:password@host:port/database_name`  |
| `CORS_ALLOWED_ORIGINS`  | Comma-separated list of origins for CORS                                   | `http://localhost:3000,http://localhost:3001`         |

### Gmail Email Configuration

These variables are required for enabling email functionality via Gmail's SMTP server.

| Variable                | Description                              | Example Value                  |
|-------------------------|------------------------------------------|--------------------------------|
| `EMAIL_HOST_USER`       | Gmail address used for sending emails    | `your-email@gmail.com`         |
| `EMAIL_HOST_PASSWORD`   | App password for the Gmail account       | `your-app-password`            |

**Important:** Do not use your Gmail account's main password. Instead, create an [app password](https://support.google.com/accounts/answer/185833?hl=en) for enhanced security.

### Setting Environment Variables Locally

For local development, you can use a `config.py` file or a `.env` file. Below is an example of how to set these variables in the `config.py` file:

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

### 2. Frontend Setup (React)

Make sure you have Node.js and npm installed.

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
    npm run dev
    ```

Your React frontend should now be running at `http://localhost:3000/`.


## Deployment

Both the backend and frontend can be deployed separately or together, depending on your preference. You will need to configure environment variables for production in your hosting platform.

## Future Features

- Drag and Drop items to move in the list
- Duplicate Lists
- Mark items as consummable (i.e. many backpackers like to track their food weight, but don't consider it in the overall pack weight)
- Change Colors of the Graph

## Contributing

Feel free to fork the project and submit pull requests for any improvements, bug fixes, or new features!

## License

This project is open-source and available under the MIT License.
