# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY back/requirements.txt .

# Install Flask and other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the content of the local backend directory to the working directory
COPY . .

# Expose the port that your Flask app runs on
EXPOSE 5000

# Define the command to run your Flask application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "back.index:app"]