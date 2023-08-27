# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install project dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port your FastAPI app will run on
EXPOSE 8000

# Command to start the FastAPI app when the container starts
CMD ["uvicorn", "core:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
