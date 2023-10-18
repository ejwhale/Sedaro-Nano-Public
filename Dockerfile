# Debian-based node base image
FROM node:20-bookworm

# Set the working directory in the container
WORKDIR /sedaro-nano/

# Copy all required files to the container
# TODO: This is for running in a dev setup. For productionization, we'd want to do a `RUN npm run build` and move the outputted files.
COPY public/ /sedaro-nano/public
COPY src/ /sedaro-nano/src
COPY package*.json /sedaro-nano/
COPY sim.py /sedaro-nano/

# Install project dependencies
RUN npm install

# Installations for Python, needed for running sim
RUN apt-get update && apt-get install -y \
  build-essential \
  zlib1g-dev \
  libncurses5-dev \
  libgdbm-dev \
  libnss3-dev \
  libssl-dev \
  libreadline-dev \
  libffi-dev \
  libsqlite3-dev \
  wget \
  libbz2-dev \
  python3

# Run the sim in order to output a data.json file.
# TODO: ideally, this should sit on a flask server behind an API endpoint that allows it to be re-run at will
RUN python3 sim.py

# Start the Node app
CMD ["npm", "start"]



















