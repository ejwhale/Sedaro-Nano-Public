# Running python
FROM python:3.12

# Create and set working directory
RUN mkdir /app
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--debug", "--host=0.0.0.0", "--port=8000" ]