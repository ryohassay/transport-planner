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

# # Build the React frontend
# RUN apt update && apt install -y npm
# WORKDIR /app/front
# COPY front/package.json front/package-lock.json ./
# RUN npm install
# COPY front/public ./public
# COPY front/src ./src
# RUN npm run build

# Copy the built frontend
COPY front/build ./front/build

# Move back to the backend directory
WORKDIR /app/back

# Serve the React frontend from Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "index:app"]


# # Define the command to run your Flask application using Gunicorn
# # CMD ["gunicorn", "--bind", "0.0.0.0:5000", "back.index:app"]
# CMD ["gunicorn", "back.index:app"]