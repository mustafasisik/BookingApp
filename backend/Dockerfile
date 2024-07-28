FROM python:3.9-slim

# set work directory
WORKDIR /usr/src/backend

RUN pip install --upgrade pip

ENV LIBRARY_PATH=/lib:/usr/lib

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# copy project
COPY . .

# install dependencies
RUN pip install -r requirements.txt


RUN sed -i 's/\r$//g' /usr/src/backend/entrypoint.sh
RUN chmod +x /usr/src/backend/entrypoint.sh

# run entrypoint.sh
ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]