FROM python:3.8-alpine3.12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app

RUN pip3 install --upgrade pip && pip3 install -r requirements.txt
	
COPY . /usr/src/app

ENTRYPOINT ["python3"]

CMD ["main.py"]
