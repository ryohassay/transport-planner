# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the backend files to the working directory
COPY back /app/back

# Install Flask and other dependencies
RUN pip install --no-cache-dir -r back/requirements.txt

# Expose the port that your Flask app runs on
EXPOSE 5000

# Copy the built frontend
COPY front/build ./front/build

# Move back to the backend directory
WORKDIR /app/back

# Serve the React frontend from Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "index:app"]
