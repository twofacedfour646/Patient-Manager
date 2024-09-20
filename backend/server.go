package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/twofacedfour646/patient-manager/api"
	"github.com/twofacedfour646/patient-manager/config"
	"github.com/twofacedfour646/patient-manager/db"
	"github.com/twofacedfour646/patient-manager/services/appointments"
	"github.com/twofacedfour646/patient-manager/services/user"
)

func main() {
	// Attempt to get database
	db, db_err := db.NewMySQLStorage(mysql.Config{
		User:                 config.Envs.DBUser,
		Passwd:               config.Envs.DBPassword,
		Addr:                 config.Envs.DBAddress,
		DBName:               config.Envs.DBName,
		Net:                  "tcp",
		AllowNativePasswords: true,
		ParseTime:            true,
	})
	if db_err != nil {
		log.Fatal(db_err)
	}

	// Confirm database connection
	initStorage(db)

	// Database stores
	userStore := user.NewUserStore(db)
	appointmentStore := appointments.NewAppointmentStore(db)

	// Generate router
	router := mux.NewRouter()

	// Create user handler
	userHandler := user.NewUserHandler(userStore)
	userHandler.RegisterRoutes(router)

	// Create appointments handler
	appointmentHandler := appointments.NewAppointmentHandler(appointmentStore)
	appointmentHandler.RegisterRoutes(router)

	// Generate instance of API Server
	apiServer := api.NewAPIServer(":8080", db)

	// Create enhancedRouter with CORS enabled
	enhancedRouter := enableCors(jsonContentTypeMiddleware(router))

	// Run the server
	err := apiServer.Run(enhancedRouter)
	if err != nil {
		fmt.Println("there was an issue running the server")
	}
}

// Function for testing if database is connected
func initStorage(db *sql.DB) {
	// Attempt to ping database to confirm the connection is active
	err := db.Ping()

	// Log err if there is an error pinging the database
	if err != nil {
		log.Fatal(err)
	}

	// Message to indicate the database is connected
	log.Println("DB: Successfully Connected")
}

func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS header
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Check if request if for CORS preflight
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass down the request to next handler
		next.ServeHTTP(w, r)
	})
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set JSON content type
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
