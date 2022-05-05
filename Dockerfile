FROM itporbit/react-native-android:latest

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["react-native", "run-android"]
