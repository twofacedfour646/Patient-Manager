package appointments

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/twofacedfour646/patient-manager/config"
	"github.com/twofacedfour646/patient-manager/types"
	"github.com/twofacedfour646/patient-manager/utils"
)

type Handler struct {
	store *Store
}

func NewAppointmentHandler(store *Store) *Handler {
	return &Handler{
		store: store,
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/new/appointment", h.handleNewAppointment).Methods("POST", "OPTIONS")
	router.HandleFunc("/update/status", h.handleStatusUpdate).Methods("POST", "OPTIONS")
}

// Update status of appointment
func (h *Handler) handleStatusUpdate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Check request headers to ensure user is authenticated
	// Get token string from request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		utils.WriteJson(w, http.StatusBadRequest, "Missing authorization header")
		return
	}

	tokenString = tokenString[len("Bearer "):]

	// Verify token
	authErr := verifyToken(tokenString)
	if authErr != nil {
		utils.WriteError(w, http.StatusBadRequest, authErr)
		return
	}

	// Get payload
	var payload types.UpdateAppointmentPayload
	if parsingErr := utils.ParseJson(r, &payload); parsingErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, parsingErr)
		return
	}

	updateErr := h.store.UpdateAppointmentStatus(payload)
	if updateErr != nil {
		utils.WriteError(w, http.StatusBadRequest, updateErr)
		return
	}
}

// Create a new appointment
func (h *Handler) handleNewAppointment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Check request headers to ensure user is authenticated
	// Get token string from request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		utils.WriteJson(w, http.StatusBadRequest, "Missing authorization header")
		return
	}

	tokenString = tokenString[len("Bearer "):]

	// Verify token
	authErr := verifyToken(tokenString)
	if authErr != nil {
		utils.WriteError(w, http.StatusBadRequest, authErr)
		return
	}

	// Get payload
	var payload types.CreateAppointmentPayload
	if parsingErr := utils.ParseJson(r, &payload); parsingErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, parsingErr)
		return
	}

	claims, decodeErr := decodeToken(tokenString)
	if decodeErr != nil {
		utils.WriteError(w, http.StatusInternalServerError, decodeErr)
	}

	userId := claims["id"]

	// Validate input
	// Create new appointment
	err := h.store.CreateNewAppointment(payload, userId)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
}

func verifyToken(tokenString string) error {
	// Get secret key
	secretKey := []byte(config.Envs.JWT_SECRET_KEY)

	// Get token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Make sure that the signing method is what you expect
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return secretKey, nil
	})

	// Check for error getting token
	if err != nil {
		return err
	}

	// Check if token is invalid
	if !token.Valid {
		return fmt.Errorf("invalid token")
	}

	return nil
}

func decodeToken(tokenString string) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}

	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Envs.JWT_SECRET_KEY), nil
	})
	if err != nil {
		return nil, err
	}

	return claims, nil
}
