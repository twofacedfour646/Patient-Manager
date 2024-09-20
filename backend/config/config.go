package config

import (
	"fmt"
	"os"

	"github.com/lpernett/godotenv"
)

type Config struct {
	PublicHost string
	Port       string

	DBUser     string
	DBPassword string
	DBAddress  string
	DBName     string

	JWT_SECRET_KEY string
}

var Envs = initConfig()

func initConfig() Config {
	godotenv.Load()

	// Return config object
	return Config{
		PublicHost:     getEnv("PUBLIC_HOST", "http://localhost"),
		Port:           getEnv("PORT", ":8080"),
		DBUser:         getEnv("DB_USER", ""),
		DBPassword:     getEnv("DB_PASSWORD", ""),
		DBAddress:      fmt.Sprintf("%s:%s", getEnv("DB_HOST", "127.0.0.1"), getEnv("DB_PORT", "3306")),
		DBName:         "patient_manager",
		JWT_SECRET_KEY: getEnv("JWT_SECRET_KEY", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}
