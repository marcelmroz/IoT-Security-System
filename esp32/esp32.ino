#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "WiFi_Name";
const char* password = "WiFi_Password";
const char* serverUrl = "Server_Endpoint";
const char* esp32Secret = "your_esp32_secret_here";


const int LED_BUILTIN = 2;
const int trigPin = 5;
const int echoPin = 18;
const int doorDistance = 85;
const int tolerance = 5;
const int maxValidDistance = 1000;

#define SOUND_SPEED 0.034

long duration;
float distanceCm;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode (LED_BUILTIN, OUTPUT);
  // digitalWrite(LED_BUILTIN, LOW);
  connectToWiFi();
}

void loop() {
  measureDistance();
  if (abs(distanceCm - doorDistance) > tolerance && distanceCm <= maxValidDistance) {
    sendDataToServer();
  }
  delay(1000);
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected to WiFi");
}

void measureDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distanceCm = duration * SOUND_SPEED / 2;
}

void sendDataToServer() {
  HTTPClient http;
  
  String jsonPayload = "{\"message\": \"Potential threat!\"}";
  Serial.println("Sending data to server: Potential threat! cm: " + String(distanceCm));
  
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-esp32-secret", esp32Secret); // Add the secret header
  int httpResponseCode = http.POST(jsonPayload);

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  
  http.end();
}
