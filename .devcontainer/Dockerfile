FROM ubuntu:latest

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install essential packages including Python, Node.js, and Yarn
RUN apt-get update && apt-get install -y \
    git \
    vim \
    wget \
    curl \
    build-essential \
    python3 \
    python3-pip \
    python3.12-venv \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install NVM (Node Version Manager) to manage Node.js versions
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Set up NVM environment and install Node.js LTS version and Yarn
RUN bash -c ". ~/.nvm/nvm.sh && \
    nvm install --lts && \
    nvm use --lts && \
    npm install --global yarn"


#Install Python dependencies globally using pip if needed
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /workspace
COPY ./prediction-api/requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# # Set the working directory for the application
# WORKDIR /workspace

# # Start the application (adjust as per your app's entry point)
# CMD ["/bin/bash"]